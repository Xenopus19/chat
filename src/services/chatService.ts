import { Types } from "mongoose";
import { ChatMembership } from "../models/ChatMembership";
import { Chat, type ChatDocument } from "../models/Chat";
import { User } from "../models/User";

export const getChatById = async (chatId: Types.ObjectId): Promise<ChatDocument | null> => {
    return await Chat.findById(chatId);
}

export const createOrFindChatByIds = async (
  userId1: Types.ObjectId,
  userId2: Types.ObjectId,
): Promise<ChatDocument> => {
    const chat = await getChatByUsersIds(userId1, userId2);
    if(chat) {
        return chat;
    }
    const newChat = new Chat({});
    await newChat.save();
    const newChatMembership1 = new ChatMembership({ chatId: newChat._id, userId: userId1 });
    const newChatMembership2 = new ChatMembership({ chatId: newChat._id, userId: userId2 });
    await newChatMembership1.save();
    await newChatMembership2.save();
    return newChat;
};

export const getUserChats = async (userId: Types.ObjectId | string): Promise<ChatDocument[]> => {
  const id = typeof userId === "string" ? new Types.ObjectId(userId) : userId;
  const memberships = await ChatMembership.find({ userId: id }).select("chatId");
  const chatIds = memberships.map((membership) => membership.chatId);
  const chats = (await Chat.find({ _id: { $in: chatIds } })) as ChatDocument[];
  await Promise.all(
    chats.map(async (chat) => {
      if (chat.name) {
        return;
      }

      const otherUser = await getOtherUserInChat(chat._id, id);
      if (!otherUser?.username) {
        return;
      }

      chat.name = otherUser.username;
    }),
  );

  return chats;
}

export const getOtherUserInChat = async (chatId: Types.ObjectId, userId: Types.ObjectId) => {
  const memberships = await ChatMembership.find({ chatId }).select("userId");
  const otherMembership = memberships.find((membership) => !membership.userId.equals(userId));
  if(!otherMembership) {
    return null;
  }
  const otherUser = otherMembership ? await User.findById(otherMembership.userId) : null;
  return otherUser;
}

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
