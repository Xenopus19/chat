import { Types } from "mongoose";
import { ChatMembership } from "../models/ChatMembership";
import { Chat, type ChatDocument } from "../models/Chat";
import { User } from "../models/User";
import { Message } from "../models/Message";

export interface ChatOtherUser {
  id: string;
  username: string;
  avatarUrl: string | null;
}

interface ChatBase {
  id: string;
  name: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatWithOtherUser extends ChatBase {
  otherUser: ChatOtherUser | null;
}

export interface ChatLastMessage {
  id: string;
  text: string;
  createdAt: Date;
  senderId: string;
}

export interface UserChatListItem {
  id: string;
  name: string | null;
  createdAt: Date;
  updatedAt: Date;
  otherUser: ChatOtherUser | null;
  unreadCount: number;
  lastMessage: ChatLastMessage | null;
}

export const getChatById = async (
  chatId: Types.ObjectId,
  userId: Types.ObjectId,
): Promise<ChatWithOtherUser | null> => {
  const otherUser = await getOtherUserInChat(chatId, userId);
  const chat = await Chat.findById(chatId);

  if (!chat || !otherUser) {
    return null;
  }

  return {
    id: chat.id,
    name: chat.name ?? otherUser.username,
    createdAt: chat.createdAt,
    updatedAt: chat.updatedAt,
    otherUser,
  };
};

export const createOrFindChatByIds = async (
  userId1: Types.ObjectId,
  userId2: Types.ObjectId,
): Promise<ChatDocument> => {
  const chat = await getChatByUsersIds(userId1, userId2);
  if (chat) {
    return chat;
  }
  const newChat = new Chat({});
  await newChat.save();
  const newChatMembership1 = new ChatMembership({
    chatId: newChat._id,
    userId: userId1,
  });
  const newChatMembership2 = new ChatMembership({
    chatId: newChat._id,
    userId: userId2,
  });
  await newChatMembership1.save();
  await newChatMembership2.save();
  return newChat;
};

export const getUserChats = async (
  userId: Types.ObjectId | string,
): Promise<UserChatListItem[]> => {
  const currentUserId = typeof userId === "string" ? new Types.ObjectId(userId) : userId;

  const memberships = await ChatMembership.find({ userId: currentUserId }).select("chatId").lean();
  const chatIds = memberships.map((m) => m.chatId);

  if (chatIds.length === 0) {
    return [];
  }

  const chats = await Chat.find({ _id: { $in: chatIds } }).lean();

  const userChats = await Promise.all(
    chats.map(async (chat) => {
      const [otherUser, unreadCount, lastMessageDoc] = await Promise.all([
        getOtherUserInChat(chat._id, currentUserId),
        Message.countDocuments({
          chatId: chat._id,
          status: "DELIVERED",
          userId: { $ne: currentUserId },
        }),
        Message.findOne({ chatId: chat._id })
          .sort({ createdAt: -1 })
          .select("_id text createdAt userId")
          .lean(),
      ]);

      const lastMessage: ChatLastMessage | null = lastMessageDoc
        ? {
            id: lastMessageDoc._id.toString(),
            text: lastMessageDoc.text,
            createdAt: lastMessageDoc.createdAt,
            senderId: lastMessageDoc.userId.toString(),
          }
        : null;

      return {
        id: chat._id.toString(),
        name: chat.name ?? otherUser?.username ?? null,
        createdAt: chat.createdAt,
        updatedAt: chat.updatedAt,
        otherUser,
        unreadCount,
        lastMessage,
      };
    }),
  );

  return userChats;
};

export const getOtherUserInChat = async (
  chatId: Types.ObjectId,
  userId: Types.ObjectId,
) => {
  const membershipsForChat = await ChatMembership.find({ chatId }).select(
    "userId",
  );
  const currentUserMembership = membershipsForChat.find((membership) =>
    membership.userId.equals(userId),
  );

  if (!currentUserMembership) {
    return null;
  }

  const otherMembership = membershipsForChat.find(
    (membership) => membership.userId.toString() !== userId.toString(),
  );

  if (!otherMembership) {
    return null;
  }

  const otherUser = await User.findById(otherMembership.userId)
    .select("username avatarUrl")
    .lean<{
      _id: Types.ObjectId;
      username: string;
      avatarUrl: string | null;
    }>();

  if (!otherUser) {
    return null;
  }

  return {
    id: otherUser._id.toString(),
    username: otherUser.username,
    avatarUrl: otherUser.avatarUrl ?? null,
  };
};

export const getChatByUsersIds = async (
  userId1: Types.ObjectId,
  userId2: Types.ObjectId,
): Promise<ChatDocument | null> => {
  const membershipsCollection = ChatMembership.collection.name;

  const [chatMatch] = await ChatMembership.aggregate<{ _id: Types.ObjectId }>([
    {
      $match: {
        userId: { $in: [userId1, userId2] },
      },
    },

    {
      $group: {
        _id: "$chatId",
        matchedUsers: { $addToSet: "$userId" },
        matchedUserCount: { $sum: 1 },
      },
    },

    {
      $match: {
        matchedUserCount: 2,
        $expr: { $eq: [{ $size: "$matchedUsers" }, 2] },
      },
    },

    {
      $lookup: {
        from: membershipsCollection,
        localField: "_id",
        foreignField: "chatId",
        as: "allMembers",
      },
    },

    {
      $match: {
        $expr: { $eq: [{ $size: "$allMembers" }, 2] },
      },
    },

    {
      $project: {
        _id: 1,
      },
    },
    {
      $limit: 1,
    },
  ]);

  if (!chatMatch?._id) {
    return null;
  }

  return Chat.findById(chatMatch._id);
};
