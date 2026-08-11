import { Server as HttpServer } from "http";
import { Server } from "socket.io";
import type {
  SocketWithUserData,
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData,
} from "./types/socketTypes";
import { CLIENT_ORIGIN } from "./config";
import { extractUserMiddleware } from "./services/socketAuthService";
import {
  handleCreateMessage,
  handleViewMessage,
  joinSocketToUserChats,
  setSocketServer,
} from "./services/socketService";

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
      await handleCreateMessage(socket, messageData, user.id);
    });

    socket.on("viewMessage", async (messageId) => {
      await handleViewMessage(messageId);
    });

    socket.on("joinChatRoom", async (chatId) => {
      await socket.join(chatId);
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
