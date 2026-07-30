import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import { TokenUser } from "./loginService";

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

export const getBearerTokenFromAuthorization = (
  authorization?: string,
): string | null => {
  if (!authorization || !authorization.toLowerCase().startsWith("bearer ")) {
    return null;
  }

  return authorization.substring(7);
};

export const getUserByToken = (token?: string): TokenUser | null => {
  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!isTokenUser(decoded)) {
      return null;
    }

    return decoded;
  } catch {
    return null;
  }
};
