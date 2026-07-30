import { Message } from "../models/Message";

export const addMessage = async (messageData: {
  text: string;
  chatId: string;
  userId: string;
}) => {
    const message = new Message(messageData);
    await message.save();
    return message;
};
