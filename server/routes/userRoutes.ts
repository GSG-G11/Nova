import { Router } from 'express';
import { cancalInterview } from '../controllers';
import { userAuth } from '../middlewares/auth';

const router: Router = Router();

router.patch('/:interviewId', userAuth, cancalInterview);

export default router;
