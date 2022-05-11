import { Router } from 'express';
import authRouter from './authRoutes';
import interviewRouter from './interviewRoutes';

const router: Router = Router();

router.use(authRouter);
router.use(interviewRouter);

export default router;
