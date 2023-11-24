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

export const userController = {
  createUser,
};
