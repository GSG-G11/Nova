import { Router } from 'express';
import { updateReview, getAllReviews } from '../controllers';
import { userAuth } from '../middlewares/auth';

const router: Router = Router();

router.patch('/user/interview/review/:interviewId', userAuth, updateReview);
router.get('/user/review', userAuth, getAllReviews);

export default router;
