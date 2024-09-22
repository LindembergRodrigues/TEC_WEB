import { Request, Response } from 'express';
import { PrismaClient, Turma } from '@prisma/client';
import * as turmaService from '../service/turmaService';

const prisma = new PrismaClient();

export const createTurma = async (req: Request, res: Response) => {
  const turma = req.body as Turma;
  try {
    const turmaCreate = await turmaService.createTurma(turma);
    res.status(201).json(turmaCreate);
  } catch (error) {
    res.status(500).json({ error: 'Turma creation failed' });
  }
};

export const getTurmas = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const turmas = await turmaService.getTurma(id);
    res.status(200).json(turmas);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Turmas' });
  }
};

export const deleteTurmas = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const turmas = await turmaService.deleteTurma(id);
    res.status(201).json('Removido!');
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Turmas' });
  }
};

export const updateTurmas = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const turma = req.body as Turma;
    const updatedTurma = await turmaService.updateTurma(turma, id);
    res.status(201).json(updatedTurma);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Turmas' });
  }
};
