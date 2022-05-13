import express, { Router } from 'express';
import {
  getInterviews,
  deleteInterview,
  getAllReviews,
  getUserById,
} from '../controllers';
import { userAuth } from '../middlewares/auth';

const router: Router = express.Router();

router.get('/users/interview', userAuth, getInterviews);
router.delete('/interview/:id', userAuth, deleteInterview);
router.get('/user/review', userAuth, getAllReviews);
router.get('/user/info/:id', getUserById);
router.get('/user/review', userAuth, getAllReviews);

export default router;
