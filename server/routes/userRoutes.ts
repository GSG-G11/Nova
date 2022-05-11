import express, { Router } from 'express';
import {
  deleteInterview,
} from '../controllers';
import { userAuth } from '../middleWares/auth';

const router: Router = express.Router();

router.delete('/interview/:id', userAuth, deleteInterview);

export default router;
