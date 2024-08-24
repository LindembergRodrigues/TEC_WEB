import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createUser = async (req: Request, res: Response) => {
  const { email, name } = req.body;
  try {
    //const user = await prisma.user.create({
    //   data: { email, name },
    // });
    res.status(201).json("user");
  } catch (error) {
    res.status(500).json({ error: 'User creation failed' });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    //const users = await prisma.user.findMany();
    res.status(200).json("users");
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};
