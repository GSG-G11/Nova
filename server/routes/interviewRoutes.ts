import { Router } from 'express';
import { createInterview, getAvailableTime } from '../controllers';
import { userAuth } from '../middlewares/auth';

const router : Router = Router();

router.post('/interview', userAuth, createInterview);
router.get('/interview/available', getAvailableTime);

export default router;
