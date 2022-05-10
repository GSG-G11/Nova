import express, { Router } from 'express';

import { getUserById } from '../controllers';
import { userAuth } from '../middlewares/auth';

const router: Router = express.Router();

router.get('/:id', userAuth, getUserById);

export default router;
