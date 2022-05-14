import express, { Router } from 'express';
import {
  updateInfo,
  getInterviews,
  deleteInterview,
  getAllReviews,
  getUserById,
  cancalInterview,
} from '../controllers';
import { userAuth } from '../middleWares/auth';

const router: Router = express.Router();

router.patch('/user', userAuth, updateInfo);
router.get('/users/interview', userAuth, getInterviews);
router.delete('/interview/:id', userAuth, deleteInterview);
router.get('/user/review', userAuth, getAllReviews);
router.get('/user/info/:id', getUserById);
router.patch('/:interviewId', userAuth, cancalInterview);
router.get('/user/review', userAuth, getAllReviews);

export default router;
