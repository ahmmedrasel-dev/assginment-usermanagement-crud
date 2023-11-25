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

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const result = await userService.getSingleUserFromDb(userId);
    res.status(200).json({
      success: true,
      message: 'User Fatched Successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
      error: {
        code: 404,
        description: 'User Not Found!',
      },
    });
  }
};

const updateUserInfo = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;
    const id = Number(req.params.userId);
    const result = await userService.updateUserInfo(id, userData);
    res.status(200).json({
      success: true,
      message: 'User Updated Successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
      error: {
        code: 404,
        description: 'User Not Found!',
      },
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.userId);
    await userService.deleteUser(id);
    res.status(200).json({
      status: 'success',
      message: 'User deleted successfully',
      data: null,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
      error: {
        code: 404,
        description: 'User Not Found!',
      },
    });
  }
};

const createOder = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.userId);
    const { productName, price, quantity } = req.body;
    const orders = { productName, price, quantity };
    await userService.createOderToDb(id, orders);
    res.status(200).json({
      status: 'success',
      message: 'Oder created successfully!',
      data: null,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
      error: {
        code: 404,
        description: 'User Not Found!',
      },
    });
  }
};

const getSingleUserOders = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.userId);
    const result = await userService.getSingleUserOders(id);
    res.status(200).json({
      status: 'success',
      message: 'Oder fetched successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
      error: {
        code: 404,
        description: 'User Not Found!',
      },
    });
  }
};
export const userController = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUserInfo,
  deleteUser,
  createOder,
  getSingleUserOders,
};
