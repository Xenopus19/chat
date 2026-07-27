import { Schema, model, InferSchemaType } from 'mongoose';

export const chatSchema = new Schema(
  {
    name: {
      type: String,
      required: false,
      trim: true,
      minlength: [3, 'Name must be at least 3 characters long'],
    }
  },
  {
    timestamps: true,     
  }
);

export type ChatType = InferSchemaType<typeof chatSchema>;

export const Chat = model<ChatType>('Chat', chatSchema);