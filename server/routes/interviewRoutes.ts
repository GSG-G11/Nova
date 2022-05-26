import { Router } from 'express';
import {
  createInterview, getInterviewerAvailableTime,
  createReview, getAvailableTime,
} from '../controllers';
import { userAuth, checkInterviewer } from '../middlewares/auth';

const router : Router = Router();

router.post('/interview', userAuth, createInterview);
router.get('/interview/available', userAuth, getInterviewerAvailableTime);
router.post('/interview/available', userAuth, getAvailableTime);
router.post('/user/review/:id', userAuth, checkInterviewer, createReview);
export default router;
