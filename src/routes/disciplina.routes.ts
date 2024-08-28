import { Router } from 'express';
import { createDisciplina, deleteDisciplina, getDisciplina, updateDisciplina } from '../controllers/disciplinaController';

const router = Router();

router.post('/criarDisciplina', createDisciplina);
router.get('/capturarDisciplina', getDisciplina);
router.delete('/capturarDisciplina', deleteDisciplina);''
router.put('/atulizaDisciplina', updateDisciplina);


export default router;
