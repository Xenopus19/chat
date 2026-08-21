import cors from "cors";
import express from "express";
import userRouter from "./controllers/users";
import imageRouter from "./controllers/images";
import loginRouter from "./controllers/login";
import chatsRouter from "./controllers/chats";
import { CLIENT_ORIGIN } from "./config";
import messagesRouter from "./controllers/messages";
const app = express();

app.use(cors({ origin: CLIENT_ORIGIN }));
app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/images', imageRouter);
app.use('/api/login', loginRouter);
app.use('/api/chats', chatsRouter);
app.use('/api/messages', messagesRouter);

app.get("/api/health", (_req, res) => {
  res.status(200).json({ status: "ok", service: "backend", timestamp: new Date().toISOString() });
});

export default app;