import { User } from "../models/User";
import {  NewUser } from "../schemas/createUser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};

export const addUser = async (newUser: NewUser) => {
    try {
        const hashedPassword: string = await bcrypt.hash(newUser.password, 10);
        const { password: _, ...userWithoutPassword } = newUser;
    
        const user = new User({
          ...userWithoutPassword,
          passwordHash: hashedPassword,
        });
        await user.save();
        return user;
      } catch (error) {
        throw new Error(error instanceof Error ? error.message : String(error));
      }
}
    