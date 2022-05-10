import { Router } from 'express';
import { updateReview } from '../controllers';
import { checkIdValid } from '../middlewares';
import { userAuth } from '../middlewares/auth';

const router: Router = Router();

router.patch('/interview/review/:interviewId', userAuth, checkIdValid, updateReview);

export default router;
