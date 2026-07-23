import api from "@/api";
import type { SignUpRequestType } from "@/components/SignUp/SignUpSchema";

const createUser = async (data: SignUpRequestType) => {
  const response = await api.post("/users", data);
  return response.data;
};

const loginUser = async (username: string, password: string) => {
  const response = await api.post("/login", {username, password});
  return response.data;
};

export { createUser, loginUser };