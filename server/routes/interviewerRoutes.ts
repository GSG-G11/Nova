import { Router } from 'express';
import postAvailableTime from '../controllers/interviewer/postAvailableTime';
import { userAuth } from '../middlewares/auth';

const router : Router = Router();

router.post('/schedule', userAuth, postAvailableTime);

export default router;
