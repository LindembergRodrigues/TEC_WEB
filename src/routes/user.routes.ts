import { Router } from 'express';
import { createUser, getUsers, deleteUsers, updateUsers } from '../controllers/userController';

const router = Router();

router.post('/criarUsuario', createUser);
router.get('/capturarUsuario/:matricula', getUsers);
router.delete('/capturarUsuairo/:matricula', deleteUsers);
router.put('/atulizaUsuario/:matricula/:matricula', updateUsers);


export default router;
