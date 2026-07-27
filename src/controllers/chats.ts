import { Router } from "express";
import { Types } from "mongoose";
import tokenExtractor, { CustomRequest } from "../middleware/tokenExtractor";
import { createOrFindChatByIds, getUserChats } from "../services/chatService";
const chatsRouter = Router();

chatsRouter.post("/", tokenExtractor, async (req: CustomRequest, res) => {
  try {
    if(!req.decodedToken?.id || !req.body.userId || typeof req.body.userId !== "string") {
      return res.status(401).json({ message: "One of ids are missing." });
    }
    const userId1 = new Types.ObjectId(req.decodedToken.id);
    const userId2 = new Types.ObjectId(req.body.userId);
    const chat = await createOrFindChatByIds(userId1, userId2);
    return res.json(chat);
  } catch (error) {
    return res.status(400).json({
      message: "Error creating or finding chat",
      details: error instanceof Error ? error.message : String(error),
    });
  }
});

chatsRouter.get("/", tokenExtractor, async (req: CustomRequest, res) => {
  try {
    const userId = req.decodedToken?.id;
    if (!userId) {
      return res.status(401).json({ message: "User ID is missing." });
    }
    const chats = await getUserChats(new Types.ObjectId(userId));
    return res.json(chats);
  } catch (error) {
    return res.status(400).json({
      message: "Error creating or finding chat",
      details: error instanceof Error ? error.message : String(error),
    });
  }
});

export default chatsRouter;
