import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { JWT_SECRET } from "../config";
import { User } from "../models/User";

export interface TokenUser {
  id: string;
  username: string;
}

export const login = async (username: string, password: string) => {
  try {
    const user = await User.findOne({ username });

    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.passwordHash,
    );
    if (!isPasswordCorrect) {
      throw new Error("Invalid credentials.");
    }

    const tokenUser: TokenUser = {
      id: user.id,
      username: user.username,
    };

    const token = jwt.sign(tokenUser, JWT_SECRET);
    return { token, user: tokenUser };
  } catch (error) {
    throw new Error("Error during login: " + (error instanceof Error ? error.message : String(error)));
  }
};
