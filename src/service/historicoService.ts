import {Disciplina, Historico, PrismaClient, Role} from '@prisma/client';
import internal from "stream";

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

export const sugerirMatricula = async (matriculaUsuario: string, qtdCredito: number): Promise<Disciplina[] | null | string> => {
    const aluno = await  prisma.usuario.findMany({
        where: {
            matricula: matriculaUsuario,
            tipo: Role.ALUNO,
        }
        })
    if(aluno.length === 0){
        return "Aluno não cadastrado!";
    }

    const historico = await prisma.historico.findMany({
        where: {
            matriculaUsuario: matriculaUsuario,
            situacao:"APR"
        }
    });

    if (historico.length === 0) {
        return prisma.disciplina.findMany({
            where: {
                periodo:1
            }
        })
    }else{
        const disciplinasCursadas = historico.filter((item) => item.situacao === 'APR').map((item) => item.matriculaUsuario );

        let qtdCadeiras = 0
        if(qtdCredito === 0 ){
            qtdCadeiras = 24/4;
        }else if (qtdCredito >= 16 && qtdCredito <= 24 && qtdCredito %4 ===0 ){
            qtdCadeiras = qtdCadeiras /4;
        }else{
            return  "Quantidade de creditos invalida!";
        }

        const sugestao = prisma.disciplina.findMany({
            where: {
                codigo: {
                    notIn:disciplinasCursadas
                }
            },
            orderBy: {
                periodo: 'asc',
            }
            ,take:qtdCadeiras
        })
        return sugestao;
    }
    return null;
};

