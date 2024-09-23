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
 * /login:
 *   post:
 *     summary: Realiza login do usuário
 *     tags: [Login]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               matricula:
 *                 type: string
 *               email:
 *                 type: string
 *             required:
 *               - matricula
 *               - email
 *     responses:
 *       200:
 *         description: Login efetuado com sucesso
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *             token:
 *               type: string
 *       401:
 *         description: Credenciais inválidas
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
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               matricula:
 *                 type: string
 *               novaSenha:
 *                 type: string
 *             required:
 *               - matricula
 *               - novaSenha
 *     responses:
 *       200:
 *         description: Senha redefinida com sucesso
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
      res.status(200).json({ message: 'Senha redefinida com sucesso' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user', details: error });
  }
};
