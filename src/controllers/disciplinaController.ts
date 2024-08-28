import { Request, Response } from 'express';
import { Disciplina, PrismaClient, Usuario } from '@prisma/client';
import * as disciplinaService from '../service/disciplinaService'; 
const prisma = new PrismaClient();

export const createDisciplina = async (req: Request, res: Response) => {
  const disciplina = req.body as Disciplina;
  try {
    disciplinaService.createDisciplina(disciplina);
    res.status(201).json("disciplina");
  } catch (error) {
    res.status(500).json({ error: 'User creation failed' });
  }
};

export const getDisciplina = async (req: Request, res: Response) => {
  try {
    const codigo = req.params.codigo;
    const disciplina = await disciplinaService.getDisciplina(codigo);
    res.status(200).json(disciplina);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

export const deleteDisciplina= async (req: Request, res: Response) => {
  try {
    const codigo = req.params.codigo;
    const disciplina = await disciplinaService.deleteDisciplina(codigo);
    res.status(201).json('Removido!');
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

export const updateDisciplina= async (req: Request, res: Response) => {
  try {
    const codigo = req.params.matricula;
    const disciplina = req.body as Disciplina;
    const disciplinas = await disciplinaService.updateDisciplina(disciplina,codigo);
    res.status(201).json('Removido!');
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};
