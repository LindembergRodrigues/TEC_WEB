import { Horario, PrismaClient } from '@prisma/client';
import internal from 'stream';

const prisma = new PrismaClient();

export const createHorario = async (horario: Horario): Promise<Horario> => {

	return prisma.horario.create({
		data: {
			descricao: horario.descricao,
			createdAt: new Date()
		},
	});
};

export const deleteHorario = async (id: number): Promise<boolean> => {
	try {
		const result = await prisma.horario.deleteMany({
			where: {
				id: id,
			},
		});
		return result.count > 0;
	} catch (error) {
		console.error('Error ', error);
		return false;
	}
};

export const getHorario = async (id: number): Promise<Horario | null | string> => {
	try {
		const result = await prisma.horario.findFirst({
			where: {
				id: id,
			},
		});
		if (result == null) {
			return "Horário não identificado!";
		}
		return result;
	} catch (error) {
		console.error('Error ', error);
		return null;
	}
};

export const updateHorario= async (horario: Horario, id: number): Promise<Horario| null> => {
	try {
		const result = await prisma.horario.findFirst({
			where: {
				id: id,
			},
		});
		if (result == null) {
			return null;
		}

		const update = await prisma.horario.update({
			where: {
				id: id,
			},
			data: {
				descricao: horario.descricao,
				updatedAt: new Date()
			},
		})
		const result2 = await prisma.horario.findFirst({
			where: {
				id: id,
			},
		});
		return update;

	} catch (error) {
		console.error('Error ', error);
		return null;
	}
};
