import { Request, Response } from 'express';
import { Horario, PrismaClient, Usuario } from '@prisma/client';
import * as horarioService from '../service/horarioService';
const prisma = new PrismaClient();

export const createHorario = async (req: Request, res: Response) => {
  const horario = req.body as Horario;
  try {
    horarioService.createHorario(horario);
    res.status(201).json("horario");
  } catch (error) {
    res.status(500).json({ error: 'Horario creation failed' });
  }
};

export const getHorarios = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.matricula);
    const Horarios = await horarioService.getHorario(id);
    res.status(200).json(Horarios);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Horarios' });
  }
};

export const deleteHorarios = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.matricula);
    const Horarios = await horarioService.deleteHorario(id);
    res.status(201).json('Removido!');
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Horarios' });
  }
};

export const updateHorarios = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.matricula);
    const horario = req.body as Horario;
    const Horarios = await horarioService.updateHorario(horario,id);
    res.status(201).json('Removido!');
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Horarios' });
  }
};
