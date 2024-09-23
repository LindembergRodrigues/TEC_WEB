import { Request, Response } from 'express';
import { Historico } from '@prisma/client';
import * as historicoService from '../service/historicoService';

/**
 * @swagger
 * /historico:
 *   post:
 *     summary: Cria um novo histórico
 *     tags: [Histórico]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               matricula:
 *                 type: string
 *               codigoDisciplina:
 *                 type: string
 *               nota:
 *                 type: number
 *             required:
 *               - matricula
 *               - codigoDisciplina
 *               - nota
 *     responses:
 *       201:
 *         description: Histórico criado com sucesso
 *       500:
 *         description: Falha ao criar histórico
 */
export const createHistorico = async (req: Request, res: Response) => {
  const historico = req.body as Historico;
  try {
    await historicoService.createHistorico(historico);
    res.status(201).json(historico);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create historico' });
  }
};

/**
 * @swagger
 * /historico/{matricula}:
 *   get:
 *     summary: Obtém os históricos de um aluno pela matrícula
 *     tags: [Histórico]
 *     parameters:
 *       - in: path
 *         name: matricula
 *         required: true
 *         description: A matrícula do aluno
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Históricos encontrados
 *       500:
 *         description: Falha ao buscar históricos
 */
export const getHistoricos = async (req: Request, res: Response) => {
  try {
    const matricula = req.params.matricula;
    const historicos = await historicoService.getHistorico(matricula);
    res.status(200).json(historicos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch historicos' });
  }
};

/**
 * @swagger
 * /historico/{matricula}/{codigoDisciplina}:
 *   delete:
 *     summary: Remove um histórico pela matrícula e código da disciplina
 *     tags: [Histórico]
 *     parameters:
 *       - in: path
 *         name: matricula
 *         required: true
 *         description: A matrícula do aluno
 *         schema:
 *           type: string
 *       - in: path
 *         name: codigoDisciplina
 *         required: true
 *         description: O código da disciplina
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Histórico removido com sucesso
 *       500:
 *         description: Falha ao remover histórico
 */
export const deleteHistoricos = async (req: Request, res: Response) => {
  try {
    const matricula = req.params.matricula;
    const codigoDisciplina = req.params.codigoDisciplina;
    await historicoService.deleteHistorico(matricula, codigoDisciplina);
    res.status(200).json('Removido!');
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete historico' });
  }
};

/**
 * @swagger
 * /historico/{matricula}/{codigoDisciplina}:
 *   put:
 *     summary: Atualiza um histórico pela matrícula e código da disciplina
 *     tags: [Histórico]
 *     parameters:
 *       - in: path
 *         name: matricula
 *         required: true
 *         description: A matrícula do aluno
 *         schema:
 *           type: string
 *       - in: path
 *         name: codigoDisciplina
 *         required: true
 *         description: O código da disciplina
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               matricula:
 *                 type: string
 *               codigoDisciplina:
 *                 type: string
 *               nota:
 *                 type: number
 *             required:
 *               - matricula
 *               - codigoDisciplina
 *               - nota
 *     responses:
 *       200:
 *         description: Histórico atualizado com sucesso
 *       500:
 *         description: Falha ao atualizar histórico
 */
export const updateHistoricos = async (req: Request, res: Response) => {
  try {
    const matricula = req.params.matricula;
    const codigoDisciplina = req.params.codigoDisciplina;
    const historico = req.body as Historico;
    await historicoService.updateHistorico(historico, matricula, codigoDisciplina);
    res.status(200).json('Atualizado!');
  } catch (error) {
    res.status(500).json({ error: 'Failed to update historico' });
  }
};

export const sugerirMatricula = async (req: Request, res: Response) => {
  try {
    const matricula = req.params.matricula;
    const qtdCreditos = Number(req.params.qtdCreditos);

    const sugestao = await historicoService.sugerirMatricula(matricula, qtdCreditos);
    res.status(200).json(sugestao);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update historico' });
  }
};
