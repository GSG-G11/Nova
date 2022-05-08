import express, { Router } from 'express';
import authRouter from './authRoutes';

const router: Router = express.Router();

router.use(authRouter);

export default router;
