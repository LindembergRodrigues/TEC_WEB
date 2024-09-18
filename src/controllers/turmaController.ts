import { Request, Response } from 'express';
import { PrismaClient, Turma } from '@prisma/client';
import * as turmaService from '../service/turmaService';

const prisma = new PrismaClient();

/**
 * @swagger
 * tags:
 *   name: Turma
 *   description: Operações relacionadas às turmas.
 */

/**
 * @swagger
 * /turma:
 *   post:
 *     summary: Cria uma nova turma
 *     tags: [Turma]
 *     requestBody:
 *       description: Dados da turma a ser criada
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Turma'
 *     responses:
 *       201:
 *         description: Turma criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Turma'
 *       500:
 *         description: Erro ao criar turma
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
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da turma
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Turma encontrada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Turma'
 *       500:
 *         description: Erro ao buscar turma
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
 *     summary: Deleta uma turma pelo ID
 *     tags: [Turma]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da turma a ser removida
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       201:
 *         description: Turma removida com sucesso
 *       500:
 *         description: Erro ao remover turma
 */
export const deleteTurmas = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const turmas = await turmaService.deleteTurma(id);
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
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da turma a ser atualizada
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       description: Dados da turma para atualização
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Turma'
 *     responses:
 *       201:
 *         description: Turma atualizada com sucesso
 *       500:
 *         description: Erro ao atualizar turma
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

/**
 * @swagger
 * components:
 *   schemas:
 *     Turma:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         nome:
 *           type: string
 *           example: "Turma A"
 *         periodo:
 *           type: string
 *           example: "2024/1"
 */
