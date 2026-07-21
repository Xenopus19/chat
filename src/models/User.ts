import { Schema, model, InferSchemaType } from 'mongoose';

export const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true, 
      trim: true,
      minlength: [3, 'Username must be at least 3 characters long'],
    },
    passwordHash: {
      type: String,
      required: [true, 'Password hash is required'],
    },
    birthdate: {
      type: Date,
      required: [true, 'Birthdate is required'],
    },
    description: {
      type: String,
      default: '',
      maxlength: [500, 'Max description length is 500 characters'],
    },
    avatarUrl: {
      type: String,
      default: null, 
    },
  },
  {
    timestamps: true,     
  }
);

export type UserType = InferSchemaType<typeof userSchema>;

export const User = model<UserType>('User', userSchema);