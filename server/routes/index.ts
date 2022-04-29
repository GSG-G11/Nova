import express from 'express';
import signUp from '../controllers';

const router: any = express.Router();

router.post('/signup', signUp.signUp);

export default router;
