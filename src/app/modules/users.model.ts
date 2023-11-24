import { Schema, model } from 'mongoose';
import { TUserMethod, TUserModel, TUser } from './users/users.interface';
import bycript from 'bcrypt';
import config from '../config';

const userSchema = new Schema<TUser, TUserModel, TUserMethod>({
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
},{
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
      },
    },
  },
);


userSchema.pre('save', async function(next){
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this;
    user.password = await bycript.hash(user.password, Number(config.salt_rounds));
    next();
})


userSchema.methods.isUserExists = async function(id:number){
  const existingUser = User.findOne({userId: id});
  return existingUser;
}


const User = model<TUser, TUserModel>('User', userSchema);
export default User;
