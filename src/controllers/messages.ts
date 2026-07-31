import { Router } from "express";
import { getMessagesByChatId } from "../services/messageService";

const messagesRouter = Router();

messagesRouter.get("/:chatId", async (req, res) => {
  try {
    const chatId = req.params.chatId;
    if (!chatId) {
      return res.status(400).json({ message: "Chat ID is missing." });
    }

    const messages = await getMessagesByChatId(chatId);
    res.json(messages);
  } catch (error) {
    if (error instanceof Error && error.message) {
      res.status(400).json({
        message: error.message,
        details: error instanceof Error ? error.message : error,
      });
    } else {
      res.status(400).json({
        message: "Authorization error",
        details: error instanceof Error ? error.message : error,
      });
    }
  }
});

export default messagesRouter;
