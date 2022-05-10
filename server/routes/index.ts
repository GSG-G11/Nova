import express, { Router } from 'express';
import authRouter from './authRoutes';
import userRoutes from './userRoutes';

const router: Router = express.Router();

router.use(authRouter);
router.use('/user', userRoutes);

export default router;
