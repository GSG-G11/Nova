/* eslint-disable import/prefer-default-export */
import { Router } from 'express';
import authRouter from './authRoutes';
import userRouter from './userRoutes';

const router: Router = Router();

router.use(authRouter);
router.use(userRouter);
export default router;
