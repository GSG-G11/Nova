import { Router } from 'express';
import { getAllReviews } from '../controllers';
import { userAuth } from '../middlewares/auth';

const router : Router = Router();

router.get('/user/review', userAuth, getAllReviews);

export default router;
