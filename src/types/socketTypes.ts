import type { Socket } from "socket.io";
import type { MessageForClient } from "./index";
import type { NewMessage } from "../schemas/createMessage";
import type { TokenUser } from "../services/loginService";
import type ServerError from "./serverError";

export interface ServerToClientEvents {
  messageCreated: (message: MessageForClient) => void;
  exception: (error: ServerError) => void;
  messageViewed: (message: MessageForClient) => void;
}

export interface ClientToServerEvents {
  createMessage: (message: NewMessage) => void;
  viewMessage: (messageId: string) => void;
  joinChatRoom: (chatId: string) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  user?: TokenUser;
}

export type SocketWithUserData = Socket<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;
