import { Schema, model } from 'mongoose';

export interface User {
  email: string;
  passwordHash: string;
}

const userSchema = new Schema<User>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    // Reserved for a future hashed password. Authentication is intentionally out of scope.
    passwordHash: { type: String, required: true, select: false },
  },
  { timestamps: true },
);

export const UserModel = model<User>('User', userSchema);
