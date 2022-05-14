import express, { Router } from 'express';
import {
  updateInfo,
  getInterviews,
  deleteInterview,
  getAllReviews,
  cancalInterview,
  getUserById,
} from '../controllers';
import { userAuth } from '../middleWares/auth';

const router: Router = express.Router();

router.get('/interview', userAuth, getInterviews);
router.get('/review', userAuth, getAllReviews);
router.delete('/interview/:id', userAuth, deleteInterview);
router.patch('/', userAuth, updateInfo);
router.patch('/:interviewId', userAuth, cancalInterview);
router.get('/info/:id', getUserById);

export default router;
