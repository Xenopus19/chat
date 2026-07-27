import { Schema, model, InferSchemaType, Types, HydratedDocument } from "mongoose";

type SerializedChat = {
  _id?: Types.ObjectId | string;
  id?: string;
  name?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
};

export const chatSchema = new Schema(
  {
    name: {
      type: String,
      required: false,
      trim: true,
      minlength: [3, "Name must be at least 3 characters long"],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (_doc, ret: SerializedChat) => {
        const serialized: SerializedChat = { ...ret };

        if (serialized._id) {
          serialized.id = serialized._id.toString();
          delete serialized._id;
        }

        return serialized;
      },
    },
  },
);

export type ChatType = InferSchemaType<typeof chatSchema>;
export type ChatDocument = HydratedDocument<ChatType>;

export const Chat = model<ChatType>("Chat", chatSchema);
