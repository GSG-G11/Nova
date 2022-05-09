import { Router } from 'express';
import { updateReview } from '../controllers';
import { userAuth } from '../middlewares/auth';

const router: Router = Router();

router.patch('/interview/review/:interviewId', userAuth, updateReview);

export default router;
