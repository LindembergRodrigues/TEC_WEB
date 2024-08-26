import { Request, Response } from 'express';
import { PrismaClient, Usuario } from '@prisma/client';
import * as userService from '../service/userService';
const prisma = new PrismaClient();

export const createUser = async (req: Request, res: Response) => {
  const usuario = req.body as Usuario;
  try {
    userService.createUser(usuario);
    res.status(201).json("user");
  } catch (error) {
    res.status(500).json({ error: 'User creation failed' });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const matricula = req.params.matricula;
    const users = await userService.getUsers(matricula);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

export const deleteUsers = async (req: Request, res: Response) => {
  try {
    const matricula = req.params.matricula;
    const users = await userService.deleteUsers(matricula);
    res.status(201).json('Removido!');
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

export const updateUsers = async (req: Request, res: Response) => {
  try {
    const matricula = req.params.matricula;
    const usuario = req.body as Usuario;
    const users = await userService.deleteUsers(matricula);
    res.status(201).json('Removido!');
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};
