import express, { Router } from 'express';
import {
  updateInfo,
  getAllReviews,
} from '../controllers';
import { userAuth } from '../middleWares/auth';

const router: Router = express.Router();

router.patch('/user', userAuth, updateInfo);

router.get('/user/review', userAuth, getAllReviews);

export default router;
