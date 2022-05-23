import { Router } from 'express';
import authRouter from './authRoutes';
import interviewRouter from './interviewRoutes';
import userRouter from './userRoutes';
import interviewerRoutes from './interviewerRoutes';
import adminRouter from './adminRoutes';
import meetingRouter from '../zoom/createMeeting';

const router: Router = Router();

router.use(authRouter);
router.use(interviewRouter);
router.use(meetingRouter);
router.use('/interviewer', interviewerRoutes);
router.use('/admin', adminRouter);
router.use(userRouter);

export default router;
