import { Router } from 'express';
import { createDisciplina, deleteDisciplina, getDisciplina, updateDisciplina } from '../controllers/disciplinaController';

const router = Router();

router.post('/criarDisciplina', createDisciplina);
router.get('/capturarDisciplina/:codigo', getDisciplina);
router.delete('/capturarDisciplina:codigo', deleteDisciplina);''
router.put('/atulizaDisciplina:codigo', updateDisciplina);


export default router;
