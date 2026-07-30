import { Server as HttpServer } from "http";
import { Server } from "socket.io";
import { CLIENT_ORIGIN } from "./config";

let io: Server | null = null;

export const initSocket = (httpServer: HttpServer): Server => {
  io = new Server(httpServer, {
    cors: {
      origin: CLIENT_ORIGIN,
    },
  });

  io.on("connection", (socket) => {
    // eslint-disable-next-line no-console
    console.log(`Socket connected: ${socket.id}`);

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
