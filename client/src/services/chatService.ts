import api from "@/api";
import type { Chat } from "@/types";

export const createOrGetChat = async (userId: string) => {
    const response = await api.post(`/chats`, { userId });
    return response.data;
};

export const getUserChats = async (): Promise<Chat[]> => {
    const response = await api.get(`/chats`);
    return response.data;
}

