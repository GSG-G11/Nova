import { Router } from 'express';
import { acceptInterviewer } from '../controllers';

const router: Router = Router();

router.post('/approval/:id', acceptInterviewer);

export default router;
