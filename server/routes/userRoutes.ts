import { Router } from 'express';
import { cancalInterview, getAllReviews } from '../controllers';
import { userAuth } from '../middlewares/auth';

const router: Router = Router();

router.patch('/:interviewId', userAuth, cancalInterview);
router.get('/user/review', userAuth, getAllReviews);

export default router;
