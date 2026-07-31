import { Socket } from "socket.io";
import { MessageType } from "../models/Message";
import { NewMessage } from "../schemas/createMessage";
import { TokenUser } from "../services/loginService";
import ServerError from "./serverError";

export interface ServerToClientEvents {
  messageCreated: (message: MessageType) => void;
  exception: (error: ServerError) => void;
}

export interface ClientToServerEvents {
  createMessage: (message: NewMessage) => void;
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