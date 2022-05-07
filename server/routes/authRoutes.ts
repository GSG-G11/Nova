/* eslint-disable import/extensions */
import express, { Router } from 'express';
import { checkAuth } from '../controllers';
import { userAuth } from '../middlewares/auth';

const router: Router = express.Router();

router.get('/api/checkAuth', userAuth, checkAuth);

export default router;
