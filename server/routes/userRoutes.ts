import { Router } from 'express';
import { getAllReviews, getUserById } from '../controllers';
import { userAuth } from '../middlewares/auth';

const router : Router = Router();

router.get('/info/:id', getUserById);
router.get('/review', userAuth, getAllReviews);

export default router;
