import { Request, Response } from 'express';
import { PrismaClient, Usuario } from '@prisma/client';
import * as userService from '../service/userService';
const prisma = new PrismaClient();
