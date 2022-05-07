import express from 'express';
import { signup } from '../controllers';
import authRouter from './authRoutes/login';

const router: any = express.Router();

router.use(signup);
router.use(authRouter);

export default router;
