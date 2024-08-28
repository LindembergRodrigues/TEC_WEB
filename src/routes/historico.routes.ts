import { Router } from 'express';
import { createHistorico, deleteHistoricos, getHistoricos, updateHistoricos } from '../controllers/historicoController';

const router = Router();

router.post('/criarHistorico', createHistorico);
router.get('/capturarHistorico', getHistoricos);
router.delete('/capturarHistorico', deleteHistoricos);
router.put('/atulizaHistorico', updateHistoricos);


export default router;
