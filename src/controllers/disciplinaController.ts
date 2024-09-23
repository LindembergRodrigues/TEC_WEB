import { Request, Response } from 'express';
import { Disciplina } from '@prisma/client';
import * as disciplinaService from '../service/disciplinaService';

/**
 * @swagger
 * /disciplina:
 *   post:
 *     summary: Cria uma nova disciplina
 *     tags: [Disciplina]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               codigo:
 *                 type: string
 *               nome:
 *                 type: string
 *               cargaHoraria:
 *                 type: integer
 *             required:
 *               - codigo
 *               - nome
 *               - cargaHoraria
 *     responses:
 *       201:
 *         description: Disciplina criada com sucesso
 *       500:
 *         description: Falha ao criar disciplina
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
 *         description: O código da disciplina
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Disciplina encontrada
 *       500:
 *         description: Falha ao buscar disciplina
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
 *         description: O código da disciplina
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Disciplina removida com sucesso
 *       500:
 *         description: Falha ao remover disciplina
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
 *               codigo:
 *                 type: string
 *               nome:
 *                 type: string
 *               cargaHoraria:
 *                 type: integer
 *             required:
 *               - codigo
 *               - nome
 *               - cargaHoraria
 *     responses:
 *       200:
 *         description: Disciplina atualizada com sucesso
 *       500:
 *         description: Falha ao atualizar disciplina
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
