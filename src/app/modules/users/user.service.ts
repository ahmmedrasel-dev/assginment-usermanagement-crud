import User from '../users.model';
import { TUser } from './users.interface';

const userCreateToDb = (user: TUser) => {
  const result = User.create(user);
  return result;
};

const getUsersFromDb = () => {
  const result = User.find();
  return result;
};

const getSingleUserFromDb = async (id: number) => {
    const user = new User;
    const isUserExists = await user.isUserExists(id);

    if (!isUserExists) {
        throw new Error ('User Not Found');
      }
    return isUserExists
}



export const userService = {
  userCreateToDb,
  getUsersFromDb,
  getSingleUserFromDb
};
