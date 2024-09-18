import { Router } from 'express';
import { login,resetarSenha } from '../controllers/loginController';

const router = Router();

router.post('/', login);
router.post('/resetarSenha', resetarSenha);


export default router;
