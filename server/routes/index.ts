import { Router } from 'express';
import authRouter from './authRoutes';
import userRouter from './userRoutes';

const router: Router = Router();

router.use(authRouter);
router.use('/user', userRouter);

export default router;
