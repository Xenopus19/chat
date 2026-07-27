import { Types } from "mongoose";
import { ChatMembership } from "../models/ChatMembership";
import { Chat, type ChatDocument } from "../models/Chat";

export const createOrFindChatByIds = async (
  userId1: Types.ObjectId,
  userId2: Types.ObjectId,
): Promise<ChatDocument> => {
    const chat = await getChatByUsersIds(userId1, userId2);
    if(chat) {
        return chat;
    }
    const newChat = new Chat({name: `Chat between ${userId1} and ${userId2}`});
    await newChat.save();
    const newChatMembership1 = new ChatMembership({ chatId: newChat._id, userId: userId1 });
    const newChatMembership2 = new ChatMembership({ chatId: newChat._id, userId: userId2 });
    await newChatMembership1.save();
    await newChatMembership2.save();
    return newChat;
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
