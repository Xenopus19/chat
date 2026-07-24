import { Router } from "express";
import { CreateUserSchema, NewUser } from "../schemas/createUser";
import { addUser, getAllUsers, getUserById } from "../services/usersService";
import tokenExtractor, { CustomRequest } from "../middleware/tokenExtractor";

const userRouter = Router();

userRouter.get("/", async (req, res) => {
  try {
    const users = await getAllUsers();
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
    res.status(400).json({
      message: "Error posting a user",
      details: error instanceof Error ? error.message : error,
    });
  }
});

export default userRouter;
