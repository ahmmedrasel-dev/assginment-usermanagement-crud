import { Request, Response } from 'express';
import { userService } from './user.service';

const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;
    const result = await userService.userCreateToDb(userData);
    res.status(200).json({
      success: true,
      message: 'User Create Successfully!',
      data: result,
    });
  } catch (error) {
    res.send(error);
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userService.getUsersFromDb();
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.send(error);
  }
};


const getSingleUser = async(req: Request, res: Response) => {
  try{
    const userId = Number(req.params.userId);
    const result = await userService.getSingleUserFromDb(userId);
    res.status(200).json({
      success: true,
      message: "User Fatched Successfully!",
      data: result
    })
   
  }catch(error: any){
    res.status(404).json({
      success: false,
      message: error.message,
      error: {
        code: 404,
        description: "User Not Found!"
      }
    })
    res.send(error);
  }
}

export const userController = {
  createUser,
  getAllUsers,
  getSingleUser
};
