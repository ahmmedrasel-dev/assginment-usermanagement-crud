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


const updateUserInfo = async (id:number, userData: TUser) =>{
    const user = new User;
    const existUser = await user.isUserExists(id);
    if (!existUser) {
        throw new Error ('User Not Found');
    }
    const updatedUser = await User.findOneAndUpdate({userId: id}, userData, {new: true});
    return updatedUser;
}

const deleteUser = async (id: number) => {
    const user = new User;
    const existUser = await user.isUserExists(id);
    if (!existUser) {
        throw new Error ('User Not Found');
    }
    const result = await User.findOneAndDelete({userId: id})
    return result
  }


export const userService = {
  userCreateToDb,
  getUsersFromDb,
  getSingleUserFromDb,
  updateUserInfo,
  deleteUser
};
