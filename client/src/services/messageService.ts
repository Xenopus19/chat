import api from "@/api";
import type { Message } from "@/types";

export const getMessagesByChatId = async (chatId: string): Promise<Message[]> => {
    const response = await api.get<Message[]>(`/messages/${chatId}`);
    return response.data;
};