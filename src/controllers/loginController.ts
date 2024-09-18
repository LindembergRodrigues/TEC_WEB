import { Request, Response } from 'express';
import { PrismaClient, Usuario } from '@prisma/client';
import * as loginService from '../service/loginService';
import {UsuarioDTO} from '../DTO/usuario.dto';
import {ResetSenha} from '../DTO/resetSenha.dto';


const prisma = new PrismaClient();

export const login = async (req: Request, res: Response) => {
  const usuariodto = req.body as UsuarioDTO;
  try {
    const newUser = await loginService.loginUser(usuariodto);
    res.status(201).json({ message: "Dados invalidos", newUser });
  } catch (error) {
    res.status(500).json({ error: 'login falhou', details: error });
  }
};

export const resetarSenha = async (req: Request, res: Response) => {
  try {
    const usuarioDto = req.body as ResetSenha
    const user = await loginService.resetarSenha(usuarioDto);

    if (!user) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user', details: error });
  }
};
