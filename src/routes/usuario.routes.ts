import { Router } from 'express';
import { createUser, getUsers, deleteUsers, updateUsers } from '../controllers/userController';

const router = Router();

router.post('/criarUsuario', createUser);
router.get('/capturarUsuario/:matricula', getUsers);
router.delete('/deletarUsuairo/:matricula', deleteUsers);
router.put('/atulizarUsuario/:matricula', updateUsers);


export default router;
