import { Router } from 'express';
import { createInterview, getInterviewerAvailableTime, createReview } from '../controllers';
import { userAuth, checkInterviewer } from '../middlewares/auth';

const router : Router = Router();

router.post('/interview', userAuth, createInterview);
router.get('/interview/available', userAuth, getInterviewerAvailableTime);
router.post('/user/review/:id', userAuth, checkInterviewer, createReview);
export default router;
