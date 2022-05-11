import { Router } from 'express';
import { cancalInterview } from '../controllers';

const router: Router = Router();

router.patch('/:interviewId', cancalInterview);

export default router;
