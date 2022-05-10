import express, { Router } from 'express';
import {
  getInterviews,
} from '../controllers';
import { userAuth } from '../middlewares/auth';

const router: Router = express.Router();

router.get('/users/interview', userAuth, getInterviews);

export default router;
