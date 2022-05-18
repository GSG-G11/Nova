import { Router } from 'express';
import authRouter from './authRoutes';
import interviewRouter from './interviewRoutes';
import userRouter from './userRoutes';
import interviewerRoutes from './interviewerRoutes';

const router: Router = Router();

router.use(authRouter);
router.use(interviewRouter);
router.use('/interviewer', interviewerRoutes);
router.use(userRouter);

export default router;
