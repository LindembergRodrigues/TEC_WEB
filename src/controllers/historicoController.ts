import { Request, Response } from 'express';
import { Historico, PrismaClient, Usuario } from '@prisma/client';
import * as historicoService from '../service/historicoService';
const prisma = new PrismaClient();

export const createHistorico = async (req: Request, res: Response) => {
  const historico = req.body as Historico;
  try {
    historicoService.createHistorico(historico);
    res.status(201).json("Historico");
  } catch (error) {
    res.status(500).json({ error: 'Historico creation failed' });
  }
};

export const getHistoricos = async (req: Request, res: Response) => {
  try {
    const matricula = req.params.matricula;
    const Historicos = await historicoService.getHistorico(matricula);
    res.status(200).json(Historicos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Historicos' });
  }
};

export const deleteHistoricos = async (req: Request, res: Response) => {
  try {
    const matricula = req.params.matricula;
    const codigoDisciplina = req.params.codigoDisciplina;
    const Historicos = await historicoService.deleteHistorico(matricula,codigoDisciplina);
    res.status(201).json('Removido!');
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Historicos' });
  }
};

export const updateHistoricos = async (req: Request, res: Response) => {
  try {
    const matricula = req.params.matricula;
    const codigoDisciplina = req.params.codigoDisciplina;
    const historico = req.body as Historico;
    const Historicos = await historicoService.updateHistorico(historico,matricula,codigoDisciplina);
    res.status(201).json('Removido!');
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Historicos' });
  }
};
