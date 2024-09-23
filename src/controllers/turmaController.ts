import { Request, Response } from 'express';
import { PrismaClient, Turma } from '@prisma/client';
import * as turmaService from '../service/turmaService';

const prisma = new PrismaClient();

/**
 * @swagger
 * /turma:
 *   post:
 *     summary: Cria uma nova turma
 *     tags: [Turma]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               ano:
 *                 type: integer
 *             required:
 *               - nome
 *               - ano
 *     responses:
 *       201:
 *         description: Turma criada com sucesso
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *             nome:
 *               type: string
 *             ano:
 *               type: integer
 *       500:
 *         description: Falha ao criar a turma
 */
export const createTurma = async (req: Request, res: Response) => {
  const turma = req.body as Turma;
  try {
    const turmaCreate = await turmaService.createTurma(turma);
    res.status(201).json(turmaCreate);
  } catch (error) {
    res.status(500).json({ error: 'Turma creation failed' });
  }
};

/**
 * @swagger
 * /turma/{id}:
 *   get:
 *     summary: Obtém uma turma pelo ID
 *     tags: [Turma]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da turma a ser obtida
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Turma obtida com sucesso
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *             nome:
 *               type: string
 *             ano:
 *               type: integer
 *       500:
 *         description: Falha ao buscar a turma
 */
export const getTurmas = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const turmas = await turmaService.getTurma(id);
    res.status(200).json(turmas);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Turmas' });
  }
};

/**
 * @swagger
 * /turma/{id}:
 *   delete:
 *     summary: Remove uma turma pelo ID
 *     tags: [Turma]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da turma a ser removida
 *         schema:
 *           type: integer
 *     responses:
 *       201:
 *         description: Turma removida com sucesso
 *       500:
 *         description: Falha ao remover a turma
 */
export const deleteTurmas = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    await turmaService.deleteTurma(id);
    res.status(201).json('Removido!');
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Turmas' });
  }
};

/**
 * @swagger
 * /turma/{id}:
 *   put:
 *     summary: Atualiza uma turma pelo ID
 *     tags: [Turma]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da turma a ser atualizada
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               ano:
 *                 type: integer
 *             required:
 *               - nome
 *               - ano
 *     responses:
 *       201:
 *         description: Turma atualizada com sucesso
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *             nome:
 *               type: string
 *             ano:
 *               type: integer
 *       500:
 *         description: Falha ao atualizar a turma
 */
export const updateTurmas = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const turma = req.body as Turma;
    const updatedTurma = await turmaService.updateTurma(turma, id);
    res.status(201).json(updatedTurma);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Turmas' });
  }
};
