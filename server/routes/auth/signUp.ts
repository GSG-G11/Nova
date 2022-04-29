import express from 'express';
import signUp from '../../controllers';

const router: any = express.Router();

router.post('/signup', signUp.signUp);
// router.post('/api/auth/verify', signUp.signUp);

export default router;
