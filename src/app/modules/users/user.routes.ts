import express from 'express';
import { userController } from './user.controller';

const router = express.Router();

router.post('/users', userController.createUser);
router.get('/users', userController.getAllUsers);
router.get('/users/:userId', userController.getSingleUser);

export const userRoutes = router;
