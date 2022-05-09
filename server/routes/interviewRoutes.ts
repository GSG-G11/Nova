import { Router } from 'express';
import { createInterview } from '../controllers';

const router : Router = Router();

router.post('/interview', createInterview);

export default router;
