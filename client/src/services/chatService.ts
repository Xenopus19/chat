import api from "@/api";
import type { Chat, ChatWithStatistics } from "@/types";

export const createOrGetChat = async (userId: string) => {
    const response = await api.post(`/chats`, { userId });
    return response.data;
};

export const fetchChatById = async (chatId: string) => {
    const response = await api.get<Chat>(`/chats/${chatId}`);
    return response.data;
}

export const getUserChats = async (): Promise<ChatWithStatistics[]> => {
    const response = await api.get<ChatWithStatistics[]>(`/chats`);
    return response.data;
}

