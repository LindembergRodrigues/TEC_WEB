import { Disciplina, PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

export const createDisciplina = async (disciplina: Disciplina): Promise<Disciplina> => {

	return prisma.disciplina.create({
		data: {
			codigo: disciplina.codigo, // String
			descricao: disciplina.descricao, // String
			creditos: disciplina.creditos, // Int
			turmaId: disciplina.turmaId || null,
			horarioId: disciplina.horarioId || null,
			professor: disciplina.professor || null,
			periodo: disciplina.periodo, // Int
			createdAt: new Date(),
		},
	});
};

export const deleteDisciplina = async (codigo: string): Promise<boolean> => {
	try {
		const result = await prisma.disciplina.deleteMany({
			where: {
				codigo: codigo,
			},
		});
		return result.count > 0;
	} catch (error) {
		console.error('Error ', error);
		return false;
	}
};

export const getDisciplina = async (codigo: string ): Promise<Disciplina | null | string | Disciplina[]> => {
	try {
		if (codigo === "all"){
			return await prisma.disciplina.findMany()
		}
		const result = await prisma.disciplina.findFirst({
			where: {
				codigo: codigo,
			},
		});
		if(result === null){
			return "Disciplina não cadastrada!";
		}
		return result;
	} catch (error) {
		console.error('Error ', error);
		return null;
	}
};

export const updateDisciplina = async (disciplina: Disciplina, codigo: string): Promise<Disciplina | null | string> => {
	try {
		const result = await prisma.disciplina.findFirst({
			where: {
				codigo: codigo,
			},
		});
		if (result == null) {
			return "Disciplina não cadastrada!";
		}

		const update = await prisma.disciplina.update({
			where: {
				codigo: codigo,
			},
			data: {
				codigo: disciplina.codigo,
				descricao: disciplina.descricao,
				creditos: disciplina.creditos,
				turmaId: disciplina.turmaId,
				horarioId: disciplina.horarioId,
				professor: disciplina.professor,
				periodo: disciplina.periodo,
				updatedAt: new Date(),
			},
		})
		return update;

	} catch (error) {
		console.error('Error ', error);
		return null;
	}
};
