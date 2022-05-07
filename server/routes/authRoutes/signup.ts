import express from 'express';
import { signup, validateEmail } from '../../controllers';

const router: any = express.Router();

router.post('/signup', signup);

router.get('/auth/verify', validateEmail);

export default router;
