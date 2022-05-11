import express, { Router } from 'express';
import {
  deleteInterview,
} from '../controllers';
import { userAuth } from '../middlewares/auth';

const router: Router = express.Router();

router.delete('/interview/:id', userAuth, deleteInterview);

export default router;
