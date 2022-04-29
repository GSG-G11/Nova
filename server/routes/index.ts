import express from 'express';
import signUp from './auth/signUp';

const router: any = express.Router();

router.use(signUp);

export default router;
