import express from 'express';
import { signUp, validateEmail } from '../../controllers';

const router: any = express.Router();

router.post('/signup', signUp);

router.get('/auth/verify', validateEmail);

export default router;
