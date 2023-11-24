import { Schema, model } from 'mongoose';
import { User } from './users/users.interface';

const userSchema = new Schema<User>({
  userId: { type: Number, required: true },
  username: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: true,
  },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  hobbies: [String],
  address: {
    state: { type: String },
    city: { type: String },
    country: { type: String },
  },
});

const UserModel = model<User>('User', userSchema);
export default UserModel;
