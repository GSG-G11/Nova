import { Router } from 'express';
import { acceptInterviewer } from '../controllers';

const router: Router = Router();

router.patch('/approval/:id', acceptInterviewer);

export default router;
