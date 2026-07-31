import type { Server } from "socket.io";
import type {
	SocketWithUserData,
	ClientToServerEvents,
	ServerToClientEvents,
	InterServerEvents,
	SocketData,
} from "../types.ts/socketTypes";
import { getUserChats } from "./chatService";

let io: Server<
	ClientToServerEvents,
	ServerToClientEvents,
	InterServerEvents,
	SocketData
> | null = null;

export const setSocketServer = (
	socketServer: Server<
		ClientToServerEvents,
		ServerToClientEvents,
		InterServerEvents,
		SocketData
	>,
): void => {
	io = socketServer;
};

export const joinSocketToUserChats = async (
	socket: SocketWithUserData,
): Promise<void> => {
	const user = socket.data.user;

	if (!user) {
		return;
	}

	const userChats = await getUserChats(user.id);
	const chatIds = userChats.map((chat) => chat.id);
	chatIds.forEach((chatId) => {
		socket.join(chatId);
		console.log(`User ${user.id} joined chat room: ${chatId}`);
	});
};

export const joinUserToChatRoom = (userId: string, chatId: string): void => {
	if (!io) {
		return;
	}

	io.sockets.sockets.forEach((socket) => {
		const typedSocket = socket as SocketWithUserData;
		if (typedSocket.data.user?.id === userId) {
			typedSocket.join(chatId);
		}
	});
};
