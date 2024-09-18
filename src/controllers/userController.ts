import { Request, Response } from 'express';
import { PrismaClient, Usuario } from '@prisma/client';
import * as userService from '../service/userService';
  

const prisma = new PrismaClient();

export const createUser = async (req: Request, res: Response) => {
  const usuario = req.body as Usuario;
  try {

    const newUser = await userService.createUser(usuario);
    res.status(201).json({ message: "User created successfully", newUser });
  } catch (error) {
    res.status(500).json({ error: 'User creation failed', details: error });
  }
};

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
