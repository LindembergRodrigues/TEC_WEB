import { Request, Response } from 'express';
import { Historico } from '@prisma/client';
import * as historicoService from '../service/historicoService';

export const createHistorico = async (req: Request, res: Response) => {
  const historico = req.body as Historico;
  try {
    await historicoService.createHistorico(historico);
    res.status(201).json(historico);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create historico' });
  }
};

export const getHistoricos = async (req: Request, res: Response) => {
  try {
    const matricula = req.params.matricula;
    const historicos = await historicoService.getHistorico(matricula);
    res.status(200).json(historicos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch historicos' });
  }
};

export const deleteHistoricos = async (req: Request, res: Response) => {
  try {
    const matricula = req.params.matricula;
    const codigoDisciplina = req.params.codigoDisciplina;
    await historicoService.deleteHistorico(matricula, codigoDisciplina);
    res.status(200).json('Removido!');
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete historico' });
  }
};

export const updateHistoricos = async (req: Request, res: Response) => {
  try {
    const matricula = req.params.matricula;
    const codigoDisciplina = req.params.codigoDisciplina;
    const historico = req.body as Historico;
    await historicoService.updateHistorico(historico, matricula, codigoDisciplina);
    res.status(200).json('Atualizado!');
  } catch (error) {
    res.status(500).json({ error: 'Failed to update historico' });
  }
};
