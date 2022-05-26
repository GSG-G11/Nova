import { Router } from 'express';
import deleteUser from '../controllers/users/deleteUser';
import { adminAuth, userAuth } from '../middlewares/auth';
import { acceptInterviewer, getUsersAdmin } from '../controllers';

const router: Router = Router();

router.delete('/users/:id', userAuth, adminAuth, deleteUser);
router.patch('/approval/:id', userAuth, adminAuth, acceptInterviewer);
router.get('/users', userAuth, adminAuth, getUsersAdmin);

export default router;
