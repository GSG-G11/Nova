import express, { Router } from 'express';
import { login, signup, validateEmail } from '../controllers';

const router: Router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
router.get('/auth/verify', validateEmail);

export default router;
