import { Router } from 'express';
import { createUser, getUsers } from '../controllers/userController';

const router = Router();

router.post('/Crea', createUser);
router.get('/', getUsers);

export default router;
