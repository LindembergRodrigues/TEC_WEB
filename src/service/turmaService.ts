import { Turma, PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

export const createTurma = async (turma: Turma): Promise<Turma> => {

	if (turma == null) {
		console.error('Turma invalida');
	}

	return prisma.turma.create({
		data: {
			descricao: turma.descricao,
			createdAt: new Date(),
		},
	});
};

export const deleteTurma = async (id: number): Promise<boolean> => {
	try {
		const result = await prisma.turma.deleteMany({
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

export const getTurma = async (id: number): Promise<Turma | null | string> => {
	try {
		const result = await prisma.turma.findFirst({
			where: {
				id: id,
			},
		});
		if (result == null) {
			return "Turma não Cadastrada!";
		}
		return result;
	} catch (error) {
		console.error('Error ', error);
		return null;
	}
};

export const updateTurma = async (turma: Turma, id: number): Promise<Turma | string | null> => {
	try {
		const result = await prisma.turma.findFirst({
			where: {
				id: id,
			},
		});
		if (result == null) {
			return "Turma não encontrada!";
		}

		const update = await prisma.turma.update({
			where: {
				id: id,
			},
			data: {
				descricao: turma.descricao,
				updatedAt: new Date(),
			},
		})
		return update;

	} catch (error) {
		console.error('Error ', error);
		return null;
	}
};
