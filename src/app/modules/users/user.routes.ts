import express from 'express';
import { userController } from './user.controller';

const router = express.Router();

router.post('/users', userController.createUser);
router.get('/users', userController.getAllUsers);
router.get('/users/:userId', userController.getSingleUser);
router.put('/users/:userId', userController.updateUserInfo);
router.delete('/users/:userId', userController.deleteUser);
router.put('/users/:userId/orders', userController.createOder);
router.get('/users/:userId/orders', userController.getSingleUserOders);

export const userRoutes = router;
