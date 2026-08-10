import { Message } from "../models/Message";
import { canUserWriteInChat } from "./usersService";

export const addMessage = async (messageData: {
  text: string;
  chatId: string;
  userId: string;
}) => {
  if (!(await canUserWriteInChat(messageData.userId, messageData.chatId))) {
    throw new Error(
      "User is not a member of the chat and cannot send messages.",
    );
  }
  const message = new Message({ ...messageData, status: "DELIVERED" });
  await message.save();
  return message;
};

export const getMessagesByChatId = async (chatId: string) => {
  return await Message.find({ chatId }).sort({ createdAt: 1 });
};

export const getMessageById = async (messageId: string) => {
  const message = await Message.findById(messageId);
  if (!message) {
    throw new Error("Message not found");
  }
  return message;
};
