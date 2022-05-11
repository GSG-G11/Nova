import express, { Router } from 'express';
import authRouter from './authRoutes';
import userRouter from './userRoutes';

const router: Router = express.Router();

router.use(authRouter);
router.use(userRouter);

export default router;
