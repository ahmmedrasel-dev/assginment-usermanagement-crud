import express from 'express';

const router = express.Router();

router.post('user', createUser);

export const userRoutes = router;
