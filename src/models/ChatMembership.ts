import { Schema, model, InferSchemaType } from 'mongoose';

export const chatMembershipSchema = new Schema(
  {
    chatId: {
      type: Schema.Types.ObjectId,
      ref: 'Chat',
      required: [true, 'ChatId is required'],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'UserId is required'],
    },
  },
  {
    timestamps: true,
  }
);

chatMembershipSchema.index({ chatId: 1, userId: 1 }, { unique: true });

chatMembershipSchema.index({ userId: 1 });

export type ChatMembershipType = InferSchemaType<typeof chatMembershipSchema>;
export const ChatMembership = model<ChatMembershipType>('ChatMembership', chatMembershipSchema);