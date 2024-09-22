import { Request, Response } from 'express';
import { Disciplina } from '@prisma/client';
import * as disciplinaService from '../service/disciplinaService';


export const createDisciplina = async (req: Request, res: Response) => {
  const disciplina = req.body as Disciplina;
  try {
    await disciplinaService.createDisciplina(disciplina);
    res.status(201).json(disciplina);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create disciplina' });
  }
};


export const getDisciplina = async (req: Request, res: Response) => {
  try {
    const codigo = req.params.codigo;
    const disciplina = await disciplinaService.getDisciplina(codigo);
    res.status(200).json(disciplina);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch disciplina' });
  }
};

export const deleteDisciplina = async (req: Request, res: Response) => {
  try {
    const codigo = req.params.codigo;
    await disciplinaService.deleteDisciplina(codigo);
    res.status(200).json('Removido!');
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete disciplina' });
  }
};

export const updateDisciplina = async (req: Request, res: Response) => {
  try {
    const codigo = req.params.codigo;
    const disciplina = req.body as Disciplina;
    await disciplinaService.updateDisciplina(disciplina, codigo);
    res.status(200).json('Atualizado!');
  } catch (error) {
    res.status(500).json({ error: 'Failed to update disciplina' });
  }
};
