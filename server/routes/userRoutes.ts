import express, { Router } from 'express';
import {
  updateInfo,
} from '../controllers';
import { userAuth } from '../middlewares/auth';

const router: Router = express.Router();

router.patch('/user', userAuth, updateInfo);

export default router;
