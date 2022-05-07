import express from 'express';
import signUp from './auth/signUp';
import authRouter from './authRoutes';

const router: any = express.Router();

router.use(signUp);
router.use(authRouter);

export default router;
