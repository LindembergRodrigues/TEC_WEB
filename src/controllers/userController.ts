import { Request, Response } from 'express';
import { PrismaClient, Usuario } from '@prisma/client';
import * as userService from '../service/userService';

const prisma = new PrismaClient();

/**
 * @swagger
 * /usuario:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Usuário]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               matricula:
 *                 type: string
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *               tipo:
 *                 type: string
 *             required:
 *               - matricula
 *               - nome
 *               - email
 *               - senha
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *             newUser:
 *               type: object
 *       500:
 *         description: Falha ao criar o usuário
 */
export const createUser = async (req: Request, res: Response) => {
  const usuario = req.body as Usuario;
  try {
    const newUser = await userService.createUser(usuario);
    res.status(201).json({ message: "User created successfully", newUser });
  } catch (error) {
    res.status(500).json({ error: 'User creation failed', details: error });
  }
};

/**
 * @swagger
 * /usuario/{matricula}:
 *   get:
 *     summary: Obtém um usuário pelo ID (matrícula)
 *     tags: [Usuário]
 *     parameters:
 *       - in: path
 *         name: matricula
 *         required: true
 *         description: Matrícula do usuário a ser obtido
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuário obtido com sucesso
 *         schema:
 *           type: object
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Falha ao buscar o usuário
 */
export const getUsers = async (req: Request, res: Response) => {
  try {
    const matricula = req.params.matricula;
    const user = await userService.getUsers(matricula);

    if (!user) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user', details: error });
  }
};

/**
 * @swagger
 * /usuario/{matricula}:
 *   delete:
 *     summary: Remove um usuário pelo ID (matrícula)
 *     tags: [Usuário]
 *     parameters:
 *       - in: path
 *         name: matricula
 *         required: true
 *         description: Matrícula do usuário a ser removido
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuário removido com sucesso
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Falha ao remover o usuário
 */
export const deleteUsers = async (req: Request, res: Response) => {
  try {
    const matricula = req.params.matricula;
    const success = await userService.deleteUsers(matricula);

    if (success) {
      res.status(200).json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user', details: error });
  }
};

/**
 * @swagger
 * /usuario/{matricula}:
 *   put:
 *     summary: Atualiza um usuário pelo ID (matrícula)
 *     tags: [Usuário]
 *     parameters:
 *       - in: path
 *         name: matricula
 *         required: true
 *         description: Matrícula do usuário a ser atualizado
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *               tipo:
 *                 type: string
 *             required:
 *               - nome
 *               - email
 *               - senha
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *             updatedUser:
 *               type: object
 *       404:
 *         description: Usuário não encontrado ou falha na atualização
 *       500:
 *         description: Falha ao atualizar o usuário
 */
export const updateUsers = async (req: Request, res: Response) => {
  try {
    const matricula = req.params.matricula;
    const usuario = req.body as Usuario;
    const updatedUser = await userService.updateUsers(usuario, matricula);

    if (!updatedUser) {
      res.status(404).json({ error: 'User not found or update failed' });
    } else {
      res.status(200).json({ message: 'User updated successfully', updatedUser });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user', details: error });
  }
};
