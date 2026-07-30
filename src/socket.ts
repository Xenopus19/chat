import { Server as HttpServer } from "http";
import { Server } from "socket.io";
import type { SocketWithUserData } from "./services/socketAuthService";
import { CLIENT_ORIGIN } from "./config";
import { extractUserMiddleware } from "./services/socketAuthService";
import { getUserChats } from "./services/chatService";

let io: Server | null = null;

export const initSocket = (httpServer: HttpServer): Server => {
  io = new Server(httpServer, {
    cors: {
      origin: CLIENT_ORIGIN,
    },
  });

  io.use(extractUserMiddleware);

  io.on("connection", async (socket: SocketWithUserData) => {
    const user = socket.data.user;

    if (!user) {
      socket.disconnect();
      return;
    }

    // eslint-disable-next-line no-console
    console.log(`Socket connected: ${socket.id}`);

    const userChats = await getUserChats(user.id);
    const chatIds = userChats.map((chat) => chat.id);
    chatIds.forEach((chatId) => {
      socket.join(chatId);
      console.log(`User ${user.id} joined chat room: ${chatId}`);
    });

    socket.on("disconnect", () => {
      // eslint-disable-next-line no-console
      console.log(`Socket disconnected: ${socket.id}`);
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

export const joinUserToChatRoom = (userId: string, chatId: string): void => {
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
