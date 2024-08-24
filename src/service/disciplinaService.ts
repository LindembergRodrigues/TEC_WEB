import { Disciplina, PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

export const createUser = async (disciplina:Disciplina): Promise<Disciplina> => {
	const turma = await prisma.turma.findFirst({
		where:{
			id: disciplina.turmaId
		}
	})
	if (turma == null){
		console.error('Turma invalida');
	}

	const horario = await prisma.horario.findFirst({
		where:{
			id: disciplina.turmaId
		}
	})
	if (turma == null){
		console.error('Horário invalido');
	}
	const professor = await prisma.usuario.findFirst({
		where:{
			matricula:disciplina.professor,
			tipo: Role.PROFESSOR
		}
	})
	if (professor == null){
		console.error('Professor não cadastrado');
	}
  return prisma.disciplina.create({
	data: {
		codigo: disciplina.codigo,
		descricao: disciplina.descricao,
		creditos: disciplina.creditos,
		turmaId: disciplina.turmaId,
		horarioId: disciplina.horarioId,
		professor: disciplina.professor,
		periodo: disciplina.periodo,
		createdAt : new Date(),
	      },
  });
};

export const deleteDisciplina = async (codigo:string): Promise<boolean> => {
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

export const getDisciplina = async (codigo:string): Promise<Disciplina | null>=> {
	try {
		const result = await prisma.disciplina.findFirst({
		  where: {
		    codigo: codigo,
		  },
		});
		
		return result;
	} catch (error) {
		console.error('Error ', error);
		return null;
	}
};

export const updateDisciplina= async (disciplina:Disciplina, codigo:string): Promise<Disciplina | null>=> {
	try {
		const result = await prisma.disciplina.findFirst({
		  where: {
		    codigo: codigo,
		  },
		});
		if (result != null){
			return null;
		}
		
		const update = await prisma.disciplina.update({
			where:{
				codigo:codigo,
			},
			data: {
				codigo: disciplina.codigo,
				descricao: disciplina.descricao,
				creditos: disciplina.creditos,
				turmaId: disciplina.turmaId,
				horarioId: disciplina.horarioId,
				professor: disciplina.professor,
				periodo: disciplina.periodo,
				updatedAt : new Date(),
			      },
		})
		return update;

	} catch (error) {
		console.error('Error ', error);
		return null;
	}
};
