import api from "@/api";
import type { SignUpRequestType } from "@/components/SignUp/SignUpSchema";
import type { User } from "@/types";

const createUser = async (data: SignUpRequestType) => {
  const response = await api.post("/users", data);
  return response.data;
};

const loginUser = async (username: string, password: string) => {
  const response = await api.post("/login", { username, password });
  return response.data;
};

const getMe = async (token: string | null) => {
  if (!token) {
    throw new Error("No token provided");
  }
  const response = await api.get("/users/me");
  return response.data;
};

const getAllUsers = async () => {
  const response = await api.get<User[]>("/users");
  return response.data;
}

export { createUser, loginUser, getMe, getAllUsers };
