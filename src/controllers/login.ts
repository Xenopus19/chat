import { Router } from "express";
import { login } from "../services/loginService";
import { LoginSchema } from "../schemas/createUser";

const loginRouter = Router();

loginRouter.post("/", async (req, res) => {
  try {
    const { username, password } = LoginSchema.parse(req.body);
    const loginResult = await login(username, password);
    res.json(loginResult);
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

export default loginRouter;
