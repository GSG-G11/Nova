import express, { Router } from 'express';
import {
  login, signup, validateEmail, checkAuth,
} from '../controllers';
import { userAuth } from '../middlewares/auth';

const router: Router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
router.patch('/auth/verify', validateEmail);
router.get('/users/checkAuth', userAuth, checkAuth);

export default router;
