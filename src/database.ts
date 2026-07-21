import mongoose from "mongoose";
import { DATABASE_URL } from "./config";

export const connectDatabase = async (): Promise<void> => {
  if (!DATABASE_URL) {
    throw new Error("DATABASE_URL is not set in environment variables");
  }

  await mongoose.connect(DATABASE_URL);
  
};