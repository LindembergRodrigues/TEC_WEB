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
		if (codigo === "all") {
			const disciplinas = await prisma.disciplina.findMany();
			return disciplinas;
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
		// Verifica se a disciplina existe
		const result = await prisma.disciplina.findFirst({
			where: {
				codigo: codigo,
			},
		});
		if (result == null) {
			return "Disciplina não cadastrada!";
		}

		// Criação do objeto de atualização
		const updateData: Partial<Disciplina> = { updatedAt: new Date() };

		// Adiciona apenas os campos que não são undefined
		if (disciplina.codigo !== undefined) updateData.codigo = disciplina.codigo;
		if (disciplina.descricao !== undefined) updateData.descricao = disciplina.descricao;
		if (disciplina.creditos !== undefined) updateData.creditos = disciplina.creditos;
		if (disciplina.turmaId !== undefined) updateData.turmaId = disciplina.turmaId;
		if (disciplina.horarioId !== undefined) updateData.horarioId = disciplina.horarioId;
		if (disciplina.professor !== undefined) updateData.professor = disciplina.professor;
		if (disciplina.periodo !== undefined) updateData.periodo = disciplina.periodo;

		// Atualiza a disciplina no banco de dados
		const update = await prisma.disciplina.update({
			where: {
				codigo: codigo,
			},
			data: updateData,
		});

		return update;

	} catch (error) {
		console.error('Error ', error);
		return null;
	}
};

