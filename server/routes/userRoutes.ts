import express, { Router } from 'express';

import { getUserByID } from '../controllers';

const router: Router = express.Router();

router.get('/:id', getUserByID);

export default router;
