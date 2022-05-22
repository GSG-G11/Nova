import { Router } from 'express';
import {
  login, signup, validateEmail, checkAuth, logout,
} from '../controllers';
import { userAuth } from '../middlewares/auth';

const router: Router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.patch('/auth/verify', validateEmail);
router.get('/users/checkAuth', userAuth, checkAuth);
router.post('/logout', logout);

export default router;
