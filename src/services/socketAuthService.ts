import { Socket } from "socket.io";
import { getUserByToken } from "./authService";
import { TokenUser } from "./loginService";

export type SocketWithUserData = Socket<
  Record<string, never>,
  Record<string, never>,
  Record<string, never>,
  { user?: TokenUser }
>;

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
