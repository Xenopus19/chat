import type { Message } from "./types";

export interface NewMessage {
  text: string;
  chatId: string;
}

export default interface ServerError {
  status: number;
  message: string;
  details?: string;
}

export interface ServerToClientEvents {
  messageCreated: (message: Message) => void;
  exception: (error: ServerError) => void;
  messageViewed: (message: Message) => void;
}

export interface ClientToServerEvents {
  createMessage: (message: NewMessage) => void;
  viewMessage: (messageId: string) => void;
  joinChatRoom: (chatId: string) => void;
}
