import { Router } from 'express';
import {
    createHistorico,
    deleteHistoricos,
    getHistoricos,
    sugerirMatricula,
    updateHistoricos
} from '../controllers/historicoController';


const router = Router();

router.post('/criarHistorico', createHistorico);
router.get('/capturarHistorico/:matriculaUsuario', getHistoricos);
router.delete('/deletarHistorico/:matriculaUsuario/:codigoDisciplina', deleteHistoricos);
router.put('/atualizaHistorico/:matricula/:codigoDisciplina', updateHistoricos);
router.get('/sugerirDisciplina/:matricula/:qtdCreditos', sugerirMatricula);

export default router;
