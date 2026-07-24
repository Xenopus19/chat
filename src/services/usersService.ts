import { User } from "../models/User";
import { NewUser } from "../schemas/createUser";
import bcrypt from "bcrypt";

export const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};

export const addUser = async (newUser: NewUser) => {
  const hashedPassword: string = await bcrypt.hash(newUser.password, 10);
  const { password: _, ...userWithoutPassword } = newUser;

  const user = new User({
    ...userWithoutPassword,
    passwordHash: hashedPassword,
  });
  await user.save();
  return user;
};

export const getUserById = async (id: string) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};
