import { Router } from "express";
import { CreateUserSchema, NewUser } from "../schemas/createUser";
import { addUser, getAllUsers, getUserById } from "../services/usersService";
import tokenExtractor, { CustomRequest } from "../middleware/tokenExtractor";
import mongoose from "mongoose";

const userRouter = Router();

userRouter.get("/", async (req, res) => {
  try {
    const search = typeof req.query.username === "string" ? req.query.username : undefined;
    const users = await getAllUsers(search);
    return res.json(users);
  } catch (error) {
    return res.status(400).json({
      message: "Error getting users",
      details: error instanceof Error ? error.message : String(error),
    });
  }
});

userRouter.get("/me", tokenExtractor, async (req: CustomRequest, res) => {
  try {
    const decodedToken = req.decodedToken;
    if (
      !decodedToken ||
      typeof decodedToken === "string" ||
      !("id" in decodedToken)
    ) {
      return res.status(401).json({ message: "token missing or invalid" });
    }

    const user = await getUserById(decodedToken.id);
    return res.json(user);
  } catch (error) {
    return res.status(400).json({
      message: "Error getting user",
      details: error instanceof Error ? error.message : String(error),
    });
  }
});

userRouter.post("/", async (req, res) => {
  try {
    const newUser: NewUser = await CreateUserSchema.parseAsync(req.body);
    const user = await addUser(newUser);
    res.json(user);
  } catch (error) {
    if (
      error instanceof mongoose.mongo.MongoServerError &&
      error.code === 11000
    ) {
      return res.status(409).json({
        message: "Username is taken",
      });
    }
    if (error instanceof mongoose.Error.CastError) {
      return res.status(400).json({
        message: `Invalid format for ${error.path}`,
      });
    }
    return res.status(500).json({
      message: "An unexpected server error occurred.",
    });
  }
});

export default userRouter;
