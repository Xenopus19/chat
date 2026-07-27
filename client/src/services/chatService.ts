import api from "@/api";

export const createOrGetChat = async (userId: string) => {
    const response = await api.post(`/chats`, { userId });
    return response.data;
};

