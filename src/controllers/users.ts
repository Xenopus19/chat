import { Router } from "express";
import { CreateUserSchema, NewUser } from "../schemas/createUser";
import { addUser, getAllUsers } from "../services/usersService";

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
