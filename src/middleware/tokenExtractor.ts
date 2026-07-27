import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import { Request, Response, NextFunction } from "express";
import { TokenUser } from "../services/loginService";

export interface CustomRequest extends Request {
  decodedToken?: TokenUser;
}

const isTokenUser = (token: unknown): token is TokenUser => {
  return (
    typeof token === "object" &&
    token !== null &&
    "id" in token &&
    "username" in token &&
    typeof (token as TokenUser).id === "string" &&
    typeof (token as TokenUser).username === "string"
  );
};

const tokenExtractor = (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      const decoded = jwt.verify(authorization.substring(7), JWT_SECRET);
      if(!isTokenUser(decoded)) {
        return res.status(401).json({ message: "token invalid" });
      }
      req.decodedToken = decoded;
    } catch {
      console.log("Invalid token");
      return res.status(401).json({ message: "token invalid" });
    }
  } else {
    return res.status(401).json({ message: "token missing" });
  }
  next();
};

export default tokenExtractor;
