import { Router } from 'express';
import deleteUser from '../controllers/users/deleteUser';
import { adminAuth, userAuth } from '../middlewares/auth';
import { acceptInterviewer } from '../controllers';

const router: Router = Router();

router.delete('/users/:id', userAuth, adminAuth, deleteUser);
router.patch('/approval/:id', acceptInterviewer);

export default router;
