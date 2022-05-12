import express, { Router } from 'express';
import {
  deleteInterview,
  getAllReviews,
} from '../controllers';
import { userAuth } from '../middlewares/auth';

const router: Router = express.Router();

router.delete('/interview/:id', userAuth, deleteInterview);
router.get('/user/review', userAuth, getAllReviews);

export default router;
