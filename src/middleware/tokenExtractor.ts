import { Request, Response, NextFunction } from "express";
import { TokenUser } from "../services/loginService";
import {
  getBearerTokenFromAuthorization,
  getUserByToken,
} from "../services/authService";

export interface CustomRequest extends Request {
  decodedToken?: TokenUser;
}

const tokenExtractor = (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const token = getBearerTokenFromAuthorization(req.get("authorization") ?? undefined);
  if (!token) {
    return res.status(401).json({ message: "token missing" });
  }

  const user = getUserByToken(token);
  if (!user) {
    return res.status(401).json({ message: "token invalid" });
  }

  req.decodedToken = user;
  next();
};

export default tokenExtractor;
