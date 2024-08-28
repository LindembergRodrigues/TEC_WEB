import { Router } from 'express';
import { createHorario, deleteHorarios, getHorarios, updateHorarios } from '../controllers/horarioController';

const router = Router();

router.post('/criarHorario', createHorario);
router.get('/capturarHorario', getHorarios);
router.delete('/capturarHorario', deleteHorarios);
router.put('/atulizaHorario', updateHorarios);


export default router;
