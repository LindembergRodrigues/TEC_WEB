import { Request, Response } from 'express';
import { Horario } from '@prisma/client';
import * as horarioService from '../service/horarioService';

/**
 * @swagger
 * /horario/createHorario:
 *   post:
 *     summary: Cria um novo horário
 *     tags: [Horário]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               descricao:
 *                 type: string
 *             required:
 *               - descricao
 *     responses:
 *       201:
 *         description: Horário criado com sucesso
 *       500:
 *         description: Falha ao criar horário
 */
export const createHorario = async (req: Request, res: Response) => {
  const horario = req.body as Horario;
  try {
    const newHorario = await horarioService.createHorario(horario);
    res.status(201).json(newHorario);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create horario' });
  }
};

/**
 * @swagger
 * /horario/{id}:
 *   get:
 *     summary: Obtém um horário pelo ID
 *     tags: [Horário]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: O ID do horário
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Horário encontrado
 *       500:
 *         description: Falha ao buscar horário
 */
export const getHorarios = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const horarios = await horarioService.getHorario(id);
    res.status(200).json(horarios);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch horarios' });
  }
};

/**
 * @swagger
 * /horario/{id}:
 *   delete:
 *     summary: Remove um horário pelo ID
 *     tags: [Horário]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: O ID do horário
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Horário removido com sucesso
 *       500:
 *         description: Falha ao remover horário
 */
export const deleteHorarios = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    await horarioService.deleteHorario(id);
    res.status(200).json('Removido!');
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete horario' });
  }
};

/**
 * @swagger
 * /horario/{id}:
 *   put:
 *     summary: Atualiza um horário pelo ID
 *     tags: [Horário]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: O ID do horário
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               descricao:
 *                 type: string
 *             required:
 *               - descricao
 *     responses:
 *       200:
 *         description: Horário atualizado com sucesso
 *       500:
 *         description: Falha ao atualizar horário
 */
export const updateHorarios = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const horario = req.body as Horario;
    await horarioService.updateHorario(horario, id);
    res.status(200).json('Atualizado!');
  } catch (error) {
    res.status(500).json({ error: 'Failed to update horario' });
  }
};
