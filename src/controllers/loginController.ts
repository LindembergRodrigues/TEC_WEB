import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import * as loginService from '../service/loginService';
import { UsuarioDTO } from '../DTO/usuario.dto';
import { ResetSenha } from '../DTO/resetSenha.dto';

const token = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const prisma = new PrismaClient();

/**
 * @swagger
 * tags:
 *   name: Login
 *   description: Operações relacionadas ao login e redefinição de senha.
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Realiza o login do usuário
 *     tags: [Login]
 *     requestBody:
 *       description: Dados para realizar o login
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsuarioDTO'
 *     responses:
 *       200:
 *         description: Login efetuado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login efetuado com sucesso
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       500:
 *         description: Falha ao realizar login
 */
export const login = async (req: Request, res: Response) => {
  const usuariodto = req.body as UsuarioDTO;
  try {
    const newUser = await loginService.loginUser(usuariodto);
    if (newUser != null) {
      const tokenData = {
        matricula: newUser.matricula,
        email: newUser.email
      };
      const jwtToken = token.sign(tokenData, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ message: "Login efetuado com sucesso", token: jwtToken });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Login falhou', details: error });
  }
};

/**
 * @swagger
 * /resetar-senha:
 *   post:
 *     summary: Redefine a senha do usuário
 *     tags: [Login]
 *     requestBody:
 *       description: Dados para redefinir a senha
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResetSenha'
 *     responses:
 *       200:
 *         description: Senha redefinida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 matricula:
 *                   type: string
 *                   example: "123456"
 *                 message:
 *                   type: string
 *                   example: "Senha redefinida com sucesso"
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Falha ao redefinir a senha
 */
export const resetarSenha = async (req: Request, res: Response) => {
  try {
    const usuarioDto = req.body as ResetSenha;
    const user = await loginService.resetarSenha(usuarioDto);

    if (!user) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.status(200).json({  message: 'Senha redefinida com sucesso' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user', details: error });
  }
};

/**
 * @swagger
 * components:
 *   schemas:
 *     UsuarioDTO:
 *       type: object
 *       properties:
 *         matricula:
 *           type: string
 *           example: "123456"
 *         senha:
 *           type: string
 *           example: "password123"
 *     ResetSenha:
 *       type: object
 *       properties:
 *         matricula:
 *           type: string
 *           example: "123456"
 *         novaSenha:
 *           type: string
 *           example: "newpassword123"
 */
