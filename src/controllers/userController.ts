import { Request, Response } from 'express';
import { PrismaClient, Usuario } from '@prisma/client';
import * as userService from '../service/userService';

const prisma = new PrismaClient();

/**
 * @swagger
 * tags:
 *   name: Usuario
 *   description: Operações relacionadas aos usuários.
 */

/**
 * @swagger
 * /usuario:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Usuario]
 *     requestBody:
 *       description: Dados do usuário a ser criado
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       500:
 *         description: Erro ao criar usuário
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
 *     summary: Obtém um usuário pelo ID de matrícula
 *     tags: [Usuario]
 *     parameters:
 *       - name: matricula
 *         in: path
 *         required: true
 *         description: Matrícula do usuário
 *         schema:
 *           type: string
 *           example: "123456"
 *     responses:
 *       200:
 *         description: Usuário encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro ao buscar usuário
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
 *     summary: Deleta um usuário pelo ID de matrícula
 *     tags: [Usuario]
 *     parameters:
 *       - name: matricula
 *         in: path
 *         required: true
 *         description: Matrícula do usuário a ser removido
 *         schema:
 *           type: string
 *           example: "123456"
 *     responses:
 *       200:
 *         description: Usuário removido com sucesso
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro ao remover usuário
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
 *     summary: Atualiza um usuário pelo ID de matrícula
 *     tags: [Usuario]
 *     parameters:
 *       - name: matricula
 *         in: path
 *         required: true
 *         description: Matrícula do usuário a ser atualizado
 *         schema:
 *           type: string
 *           example: "123456"
 *     requestBody:
 *       description: Dados do usuário para atualização
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       404:
 *         description: Usuário não encontrado ou atualização falhou
 *       500:
 *         description: Erro ao atualizar usuário
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

/**
 * @swagger
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       properties:
 *         matricula:
 *           type: string
 *           example: "123456"
 *         nome:
 *           type: string
 *           example: "João Silva"
 *         email:
 *           type: string
 *           example: "joao.silva@example.com"
 *         senha:
 *           type: string
 *           example: "senha123"
 *         tipo:
 *           type: string
 *           example: "estudante"
 */
