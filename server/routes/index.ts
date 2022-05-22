import { Router } from 'express';
import authRouter from './authRoutes';
import interviewRouter from './interviewRoutes';
import userRouter from './userRoutes';
import interviewerRoutes from './interviewerRoutes';
import admin from './admin';

const router: Router = Router();

router.use(authRouter);
router.use(interviewRouter);
router.use('/interviewer', interviewerRoutes);
router.use(userRouter);
router.use('/admin', admin);

export default router;
