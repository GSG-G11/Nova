import { Router } from 'express';
import authRouter from './authRoutes';
import interviewRouter from './interviewRoutes';
import userRouter from './userRoutes';

const router: Router = Router();

router.use(authRouter);
router.use('/user', userRouter);
router.use(interviewRouter);

export default router;
