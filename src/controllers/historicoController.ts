import { Request, Response } from 'express';
import { Historico } from '@prisma/client';
import * as historicoService from '../service/historicoService';

/**
 * @swagger
 * tags:
 *   name: Historico
 *   description: Operações relacionadas a históricos.
 */

/**
 * @swagger
 * /historico:
 *   post:
 *     summary: Cria um novo histórico
 *     tags: [Historico]
 *     requestBody:
 *       description: Dados do histórico a ser criado
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Historico'
 *     responses:
 *       201:
 *         description: Histórico criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Historico'
 *       500:
 *         description: Erro ao criar histórico
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
 *     summary: Obtém históricos pelo matrícula
 *     tags: [Historico]
 *     parameters:
 *       - in: path
 *         name: matricula
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Históricos encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Historico'
 *       500:
 *         description: Erro ao buscar históricos
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
 *     summary: Remove um histórico pelo matrícula e código da disciplina
 *     tags: [Historico]
 *     parameters:
 *       - in: path
 *         name: matricula
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: codigoDisciplina
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Histórico removido com sucesso
 *       500:
 *         description: Erro ao remover histórico
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
 *     summary: Atualiza um histórico pelo matrícula e código da disciplina
 *     tags: [Historico]
 *     parameters:
 *       - in: path
 *         name: matricula
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: codigoDisciplina
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Dados do histórico a ser atualizado
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Historico'
 *     responses:
 *       200:
 *         description: Histórico atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Historico'
 *       500:
 *         description: Erro ao atualizar histórico
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

/**
 * @swagger
 * components:
 *   schemas:
 *     Historico:
 *       type: object
 *       properties:
 *         matricula:
 *           type: string
 *           example: "123456"
 *         codigoDisciplina:
 *           type: string
 *           example: "MAT101"
 *         nota:
 *           type: number
 *           example: 8.5
 */
