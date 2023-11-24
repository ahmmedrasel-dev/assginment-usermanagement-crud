import UserModel from '../users.model';
import { User } from './users.interface';

const userCreateToDb = (user: User) => {
  const result = UserModel.create(user);
  return result;
};

export const userService = {
  userCreateToDb,
};
