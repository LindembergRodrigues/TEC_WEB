import { Request, Response } from 'express';
import { Horario } from '@prisma/client';
import * as horarioService from '../service/horarioService';

export const createHorario = async (req: Request, res: Response) => {
  const horario = req.body as Horario;
  try {
    const newHorario = await horarioService.createHorario(horario);
    res.status(201).json(newHorario);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create horario' });
  }
};

export const getHorarios = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const horarios = await horarioService.getHorario(id);
    res.status(200).json(horarios);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch horarios' });
  }
};

export const deleteHorarios = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    await horarioService.deleteHorario(id);
    res.status(200).json('Removido!');
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete horario' });
  }
};

export const updateHorarios = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const horario = req.body as Horario;
    await horarioService.updateHorario(horario, id);
    res.status(200).json('Atualizado!');
  } catch (error) {
    res.status(500).json({ error: 'Failed to update horario' });
  }
};
