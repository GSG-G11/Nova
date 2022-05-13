import { Router } from 'express';
import { createInterview } from '../controllers';
import { userAuth } from '../middlewares/auth';

const router : Router = Router();

router.post('/interview', userAuth, createInterview);

export default router;
