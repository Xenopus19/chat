import { Schema, model, InferSchemaType, Types } from 'mongoose';

export const MessageStatus = {
  SENT: 'SENT',
  DELIVERED: 'DELIVERED',
  READ: 'READ',
} as const;

export type MessageStatusType = (typeof MessageStatus)[keyof typeof MessageStatus];

export const messageSchema = new Schema(
  {
    text: {
      type: String,
      required: [true, 'Message text is required'],
      trim: true,
      maxlength: [2000, 'Message text cannot exceed 2000 characters'],
    },
    chatId: {
      type: Schema.Types.ObjectId,
      ref: 'Chat',
      required: [true, 'Chat ID is required'],
      index: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
      index: true,
    },
    status: {
      type: String,
      enum: {
        values: Object.values(MessageStatus),
        message: 'Status must be SENT, DELIVERED, or READ',
      },
      default: MessageStatus.SENT,
    },
  },
  {
    timestamps: true, 
    toJSON: {
      virtuals: true,
      versionKey: false,
    },
  }
);

messageSchema.index({ chatId: 1, createdAt: -1 });

export type MessageType = InferSchemaType<typeof messageSchema>;

export const Message = model<MessageType>('Message', messageSchema);