import { Router } from 'express';
import { createTurma, deleteTurmas, getTurmas, updateTurmas } from '../controllers/turmaController';

const router = Router();

router.post('/criarTurma', createTurma);
router.get('/capturarTurma', getTurmas);
router.delete('/capturarTurma', deleteTurmas);
router.put('/atulizaTurma', updateTurmas);


export default router;
