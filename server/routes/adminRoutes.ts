import { Router } from 'express';
import deleteUser from '../controllers/users/deleteUser';
import { adminAuth, userAuth } from '../middlewares/auth';

const router: Router = Router();

router.delete('/users/:id', userAuth, adminAuth, deleteUser);
export default router;
