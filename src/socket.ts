import { Server as HttpServer } from "http";
import { Server } from "socket.io";
import type {
  SocketWithUserData,
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData,
} from "./types/socketTypes";
import { ZodError } from "zod";
import { CLIENT_ORIGIN } from "./config";
import { extractUserMiddleware } from "./services/socketAuthService";
import { CreateMessageSchema } from "./schemas/createMessage";
import { addMessage, getMessageById } from "./services/messageService";
import {
  joinSocketToUserChats,
  setSocketServer,
} from "./services/socketService";
import { MessageForClient } from "./types";

let io: Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
> | null = null;

export const initSocket = (httpServer: HttpServer): Server => {
  io = new Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >(httpServer, {
    cors: {
      origin: CLIENT_ORIGIN,
    },
  });

  setSocketServer(io);

  io.use(extractUserMiddleware);

  io.on("connection", async (socket: SocketWithUserData) => {
    const user = socket.data.user;

    if (!user) {
      socket.disconnect();
      return;
    }

    await joinSocketToUserChats(socket);

    socket.on("createMessage", async (messageData) => {
      try {
        const message = CreateMessageSchema.parse(messageData);
        const createdMessage = await addMessage({
          ...message,
          userId: user.id,
        });

        // eslint-disable-next-line no-console
        console.log(`Received message from user ${user.id}:`, message);

        const newMessageForClient: MessageForClient = {
          id: createdMessage.id,
          text: createdMessage.text,
          chatId: String(createdMessage.chatId),
          userId: String(createdMessage.userId),
          createdAt: createdMessage.createdAt.toISOString(),
          updatedAt: createdMessage.updatedAt.toISOString(),
          status: createdMessage.status,
        };

        io?.to(message.chatId).emit("messageCreated", newMessageForClient);
      } catch (error) {
        if (error instanceof ZodError) {
          console.warn(
            `Validation error for user ${user.id}:`,
            error.flatten(),
          );

          socket.emit("exception", {
            status: 400,
            message: "Invalid message payload",
          });
        } else {
          socket.emit("exception", {
            status: 500,
            message: "Failed to process message",
          });
        }
      }
    });

    socket.on("viewMessage", async (messageId) => {
      const message = await getMessageById(messageId);
      message.status = "READ";
      await message.save();
      const messageForClient: MessageForClient = {
        ...message.toObject(),
        id: String(message._id),
        chatId: String(message.chatId),
        userId: String(message.userId),
        createdAt: message.createdAt.toISOString(),
        updatedAt: message.updatedAt.toISOString(),
      };
      io?.to(String(message.chatId)).emit("messageViewed", messageForClient);
    });
  });

  return io;
};

export const getIo = (): Server => {
  if (!io) {
    throw new Error("Socket.IO has not been initialized yet");
  }

  return io;
};
