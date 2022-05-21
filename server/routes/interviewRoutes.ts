import { Router } from 'express';
import { createInterview, getAvailableTime, createReview } from '../controllers';
import { userAuth, checkInterviewer } from '../middlewares/auth';

const router : Router = Router();

router.post('/interview', userAuth, createInterview);
router.post('/interview/available', userAuth, getAvailableTime);
router.post('/user/review/:id', userAuth, checkInterviewer, createReview);
export default router;
