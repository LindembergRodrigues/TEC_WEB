import { Historico, PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

export const createHistorico = async (historicoReq:Historico): Promise<Historico | null> => {
  try {
	const usuario = await prisma.usuario.findFirst({
		where:{
			matricula: historicoReq.matriculaUsuario,
			tipo: Role.ALUNO
		}
	})
	if (usuario == null){
		console.error('usuário invalido!');
	}

	const disciplina = await prisma.disciplina.findFirst({
		where:{
			codigo: historicoReq.codigoDisciplina
		}
	})
	if (disciplina == null){
		console.error('disciplina invalida!');
	}

    const historico = await prisma.historico.create({
      data: {
        matriculaUsuario: historicoReq.matriculaUsuario,
        codigoDisciplina: historicoReq.codigoDisciplina,
	situacao: historicoReq.situacao,
      },
    });
    return historico;
  } catch (error) {
    console.error('Error creating historico:', error);
    throw new Error('Failed to create historico');
  }
};

export const getHistorico = async (matriculaUsuario: string): Promise<Historico | null> => {
  try {
	const usuario = await prisma.usuario.findFirst({
		where:{
			matricula: matriculaUsuario,
			tipo: Role.ALUNO
		}
	})
	if (usuario == null){
		console.error('usuário invalido!');
	}
    const historico = await prisma.historico.findFirst({
      where: {
        matriculaUsuario:matriculaUsuario
      },
    });
    return historico;
  } catch (error) {
    console.error('Error fetching historico:', error);
    throw new Error('Failed to fetch historico');
  }
};

export const updateHistorico = async (historicoReq:Historico, matricula:string, codigo:string): Promise<Historico | null> => {
  try {
	const historicoAux = await prisma.historico.findFirst({
		where: {
			matriculaUsuario: matricula,
			codigoDisciplina: codigo,
		}
	      });
		if(historicoAux == null){
			console.error('dados invalido!');
	      }


    const historico = await prisma.historico.update({
      where: {
        matriculaUsuario_codigoDisciplina: {
          matriculaUsuario: historicoReq.matriculaUsuario,
			codigoDisciplina: historicoReq.codigoDisciplina,
        },
      },
      data: {
        situacao: historicoReq.situacao
      },
    });
    return historico;
  } catch (error) {
    console.error('Error updating historico:', error);
    throw new Error('Failed to update historico');
  }
};

export const deleteHistorico = async (matriculaUsuario: string, codigoDisciplina: string): Promise<boolean> => {
  try {
    const result = await prisma.historico.deleteMany({
      where: {
        matriculaUsuario,
        codigoDisciplina,
      },
    });
    return result.count > 0;
  } catch (error) {
    console.error('Error deleting historico:', error);
    throw new Error('Failed to delete historico');
  }
};

