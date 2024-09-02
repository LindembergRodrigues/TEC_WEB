import { Router } from 'express';
import { createHistorico, deleteHistoricos, getHistoricos, updateHistoricos } from '../controllers/historicoController';

const router = Router();

router.post('/criarHistorico', createHistorico);
router.get('/capturarHistorico/:matriculaUsuario', getHistoricos);
router.delete('/capturarHistorico/:matriculaUsuario', deleteHistoricos);
router.put('/atulizaHistorico/:matriculaUsuario', updateHistoricos);


export default router;
