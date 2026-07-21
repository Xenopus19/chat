import cors from "cors";
import express from "express";
import userRouter from "./controllers/users";

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRouter);

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "backend", timestamp: new Date().toISOString() });
});

export default app;