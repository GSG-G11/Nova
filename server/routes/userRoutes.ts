import express, { Router } from 'express';

import { getUserById } from '../controllers';

const router: Router = express.Router();

router.get('/:id', getUserById);

export default router;
