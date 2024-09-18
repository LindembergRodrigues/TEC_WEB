import { Request, Response } from 'express';
import { Horario } from '@prisma/client';
import * as horarioService from '../service/horarioService';

/**
 * @swagger
 * tags:
 *   name: Horario
 *   description: Operações relacionadas a horários.
 */

/**
 * @swagger
 * /horario:
 *   post:
 *     summary: Cria um novo horário
 *     tags: [Horario]
 *     requestBody:
 *       description: Dados do horário a ser criado
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Horario'
 *     responses:
 *       201:
 *         description: Horário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Horario'
 *       500:
 *         description: Erro ao criar horário
 */
export const createHorario = async (req: Request, res: Response) => {
  const horario = req.body as Horario;
  try {
    await horarioService.createHorario(horario);
    res.status(201).json(horario);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create horario' });
  }
};

/**
 * @swagger
 * /horario/{matricula}:
 *   get:
 *     summary: Obtém horários pelo ID
 *     tags: [Horario]
 *     parameters:
 *       - in: path
 *         name: matricula
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Horários encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Horario'
 *       500:
 *         description: Erro ao buscar horários
 */
export const getHorarios = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.matricula);
    const horarios = await horarioService.getHorario(id);
    res.status(200).json(horarios);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch horarios' });
  }
};

/**
 * @swagger
 * /horario/{matricula}:
 *   delete:
 *     summary: Remove um horário pelo ID
 *     tags: [Horario]
 *     parameters:
 *       - in: path
 *         name: matricula
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Horário removido com sucesso
 *       500:
 *         description: Erro ao remover horário
 */
export const deleteHorarios = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.matricula);
    await horarioService.deleteHorario(id);
    res.status(200).json('Removido!');
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete horario' });
  }
};

/**
 * @swagger
 * /horario/{matricula}:
 *   put:
 *     summary: Atualiza um horário pelo ID
 *     tags: [Horario]
 *     parameters:
 *       - in: path
 *         name: matricula
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Dados do horário a ser atualizado
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Horario'
 *     responses:
 *       200:
 *         description: Horário atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Horario'
 *       500:
 *         description: Erro ao atualizar horário
 */
export const updateHorarios = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.matricula);
    const horario = req.body as Horario;
    await horarioService.updateHorario(horario, id);
    res.status(200).json('Atualizado!');
  } catch (error) {
    res.status(500).json({ error: 'Failed to update horario' });
  }
};

/**
 * @swagger
 * components:
 *   schemas:
 *     Horario:
 *       type: object
 *       properties:
 *         matricula:
 *           type: integer
 *           example: 123
 *         dia:
 *           type: string
 *           example: Segunda-feira
 *         horario:
 *           type: string
 *           example: "08:00-10:00"
 */
