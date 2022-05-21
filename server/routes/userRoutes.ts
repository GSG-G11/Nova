import { Router } from 'express';
import {
  updateReview,
  updateInfo,
  getInterviews,
  deleteInterview,
  getAllReviews,
  getUserById,
  getInterviewerAvailableTime,
  getUsers,
} from '../controllers';
import { checkInterviewer, userAuth } from '../middlewares/auth';

const router: Router = Router();

router.patch('/user/interview/review/:interviewId', userAuth, updateReview);

router.get('/users', getUsers);
router.patch('/user', userAuth, updateInfo);
router.get('/users/interview', userAuth, getInterviews);
router.delete('/interview/:id', userAuth, deleteInterview);
router.get('/user/info/:id', getUserById);
router.get('/user/review', userAuth, getAllReviews);
router.get('/users/interviewer/available', userAuth, checkInterviewer, getInterviewerAvailableTime);
export default router;
