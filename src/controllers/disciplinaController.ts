import { Request, Response } from 'express';
import { Disciplina } from '@prisma/client';
import * as disciplinaService from '../service/disciplinaService';

/**
 * @swagger
 * tags:
 *   name: Disciplina
 *   description: Operações relacionadas a disciplinas.
 */

/**
 * @swagger
 * /disciplina:
 *   post:
 *     summary: Cria uma nova disciplina
 *     tags: [Disciplina]
 *     requestBody:
 *       description: Dados da disciplina a ser criada
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Disciplina'
 *     responses:
 *       201:
 *         description: Disciplina criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Disciplina'
 *       500:
 *         description: Erro ao criar disciplina
 */
export const createDisciplina = async (req: Request, res: Response) => {
  const disciplina = req.body as Disciplina;
  try {
    await disciplinaService.createDisciplina(disciplina);
    res.status(201).json(disciplina);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create disciplina' });
  }
};

/**
 * @swagger
 * /disciplina/{codigo}:
 *   get:
 *     summary: Obtém uma disciplina pelo código
 *     tags: [Disciplina]
 *     parameters:
 *       - in: path
 *         name: codigo
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Disciplina encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Disciplina'
 *       500:
 *         description: Erro ao buscar disciplina
 */
export const getDisciplina = async (req: Request, res: Response) => {
  try {
    const codigo = req.params.codigo;
    const disciplina = await disciplinaService.getDisciplina(codigo);
    res.status(200).json(disciplina);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch disciplina' });
  }
};

/**
 * @swagger
 * /disciplina/{codigo}:
 *   delete:
 *     summary: Remove uma disciplina pelo código
 *     tags: [Disciplina]
 *     parameters:
 *       - in: path
 *         name: codigo
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Disciplina removida com sucesso
 *       500:
 *         description: Erro ao remover disciplina
 */
export const deleteDisciplina = async (req: Request, res: Response) => {
  try {
    const codigo = req.params.codigo;
    await disciplinaService.deleteDisciplina(codigo);
    res.status(200).json('Removido!');
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete disciplina' });
  }
};

/**
 * @swagger
 * /disciplina/{codigo}:
 *   put:
 *     summary: Atualiza uma disciplina pelo código
 *     tags: [Disciplina]
 *     parameters:
 *       - in: path
 *         name: codigo
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Dados da disciplina a ser atualizada
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Disciplina'
 *     responses:
 *       200:
 *         description: Disciplina atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Disciplina'
 *       500:
 *         description: Erro ao atualizar disciplina
 */
export const updateDisciplina = async (req: Request, res: Response) => {
  try {
    const codigo = req.params.codigo;
    const disciplina = req.body as Disciplina;
    await disciplinaService.updateDisciplina(disciplina, codigo);
    res.status(200).json('Atualizado!');
  } catch (error) {
    res.status(500).json({ error: 'Failed to update disciplina' });
  }
};

/**
 * @swagger
 * components:
 *   schemas:
 *     Disciplina:
 *       type: object
 *       properties:
 *         nome:
 *           type: string
 *           example: Matemática
 *         codigo:
 *           type: string
 *           example: MAT101
 */
