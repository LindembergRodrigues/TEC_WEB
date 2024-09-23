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
router.delete('/deletarHistorico/:matriculaUsuario', deleteHistoricos);
router.put('/atulizaHistorico/:matriculaUsuario', updateHistoricos);
router.get('/sugerirDisciplina/:matricula/:creditos', sugerirMatricula);

export default router;
