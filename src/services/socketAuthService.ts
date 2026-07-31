import { getUserByToken } from "./authService";
import { SocketWithUserData } from "../types.ts/socketTypes";

export const extractUserMiddleware = (
  socket: SocketWithUserData,
  next: (err?: Error) => void,
) => {
  const token =
    typeof socket.handshake.auth.token === "string"
      ? socket.handshake.auth.token
      : undefined;

  const user = getUserByToken(token);
  if (!user) {
    return next(new Error("Unauthorized"));
  }

  socket.data.user = user;
  next();
};
