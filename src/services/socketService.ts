import type { Server } from "socket.io";
import type {
  SocketWithUserData,
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData,
} from "../types/socketTypes";
import { ZodError } from "zod";
import { CreateMessageSchema } from "../schemas/createMessage";
import type { MessageForClient } from "../types";
import { getUserChats } from "./chatService";
import { addMessage, getMessageById } from "./messageService";

let io: Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
> | null = null;

export const setSocketServer = (
  socketServer: Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >,
): void => {
  io = socketServer;
};

export const joinSocketToUserChats = async (
  socket: SocketWithUserData,
): Promise<void> => {
  const user = socket.data.user;

  if (!user) {
    return;
  }

  const userChats = await getUserChats(user.id);
  const chatIds = userChats.map((chat) => chat.id);
  chatIds.forEach((chatId) => {
    socket.join(chatId);
  });
};

export const joinUserToChatRoom = async (userId: string, chatId: string): Promise<void> => {
  if (!io) {
    return;
  }

  io.sockets.sockets.forEach((socket) => {
    const typedSocket = socket as SocketWithUserData;
    if (typedSocket.data.user?.id === userId) {
      typedSocket.join(chatId);
    }
  });
};

export const handleCreateMessage = async (
  socket: SocketWithUserData,
  messageData: unknown,
  userId: string,
): Promise<void> => {
  try {
    const message = CreateMessageSchema.parse(messageData);
    const createdMessage = await addMessage({
      ...message,
      userId,
    });

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
};

export const handleViewMessage = async (messageId: string): Promise<void> => {
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
};
