import { Router } from 'express';
import { createHorario, deleteHorarios, getHorarios, updateHorarios } from '../controllers/horarioController';

const router = Router();

router.post('/criarHorario', createHorario);
router.get('/capturarHorario/:id', getHorarios);
router.delete('/capturarHorario/:id', deleteHorarios);
router.put('/atulizaHorario/:id', updateHorarios);


export default router;
