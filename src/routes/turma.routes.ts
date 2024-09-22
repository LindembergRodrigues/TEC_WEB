import { Router } from 'express';
import { createTurma, deleteTurmas, getTurmas, updateTurmas } from '../controllers/turmaController';

const router = Router();

router.post('/criarTurma', createTurma);
router.get('/capturarTurma/:id', getTurmas);
router.delete('/deletarTurma/:id', deleteTurmas);
router.put('/atulizaTurma/:id', updateTurmas);


export default router;
