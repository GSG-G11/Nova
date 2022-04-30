import express from 'express';
import { signUp, validateEmail } from '../../controllers';

const router: any = express.Router();

router.post('/api/signup', signUp);
router.get('/api/auth/verify', validateEmail);

export default router;
