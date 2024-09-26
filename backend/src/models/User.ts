import type { User } from '@/types/user';
import { Schema, model } from 'mongoose';

const UserSchema = new Schema<User>({
  name: { type: 'string', required: true },
  doc: { type: 'string', required: true, unique: true }
}, { versionKey: false });

const User = model<User>('user', UserSchema);

export default User;
