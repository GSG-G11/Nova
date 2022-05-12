import { Router } from 'express';
import { updateReview, getAllReviews } from '../controllers';
import { checkIdValid } from '../middlewares';
import { userAuth } from '../middlewares/auth';

const router: Router = Router();

router.patch('/user/interview/review/:interviewId', userAuth, checkIdValid, updateReview);
router.get('/user/review', userAuth, getAllReviews);

export default router;
