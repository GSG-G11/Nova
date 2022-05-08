import express, { Router } from 'express';
import { login } from '../controllers';

const router: Router = express.Router();

router.post('/login', login);

export default router;
