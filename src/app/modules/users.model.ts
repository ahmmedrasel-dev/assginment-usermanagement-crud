import { Schema, model } from 'mongoose';
import {
  TUserMethod,
  TUserModel,
  TUser,
  TOrder,
} from './users/users.interface';
import bycript from 'bcrypt';
import config from '../config';

const oderSchema = new Schema<TOrder>({
  productName: { type: String },
  price: { type: Number },
  quantity: { type: Number },
});

const userSchema = new Schema<TUser, TUserModel, TUserMethod>(
  {
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
    orders: [oderSchema],
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
      },
    },
  },
);

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bycript.hash(user.password, Number(config.salt_rounds));
  next();
});

userSchema.methods.isUserExists = async function (id: number) {
  const existingUser = User.findOne({ userId: id });
  return existingUser;
};

userSchema.methods.totalOderPirce = async function (id: number) {
  const user = await User.findOne({ userId: id });
  const orders = user?.orders || [];

  const total = orders.reduce(
    (total, order) => total + order.price * order.quantity,
    0,
  );

  return total;
};

const User = model<TUser, TUserModel>('User', userSchema);
export default User;
