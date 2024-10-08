import { PrismaClient, Usuario } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const createUser = async (usuario: Usuario): Promise<Usuario> => {
	if (usuario == null) {
		console.error("Dados invalido");
	}
	return prisma.usuario.create({
		data: {
			matricula: usuario.matricula,
			nome: usuario.nome,
			email: usuario.email,
			senha: await bcrypt.hash(usuario.senha,10),
			tipo: usuario.tipo,
			createdAt: new Date(),
			updatedAt: new Date(),
		},
	});
};

export const deleteUsers = async (matricula: string): Promise<boolean> => {
	try {
		const result = await prisma.usuario.deleteMany({
			where: {
				matricula: matricula,
			},
		});
		return result.count > 0;
	} catch (error) {
		
		console.error('Error ', error);
		return false;
	}
};

export const getUsers = async (matricula: string): Promise<Usuario | null | string> => {
	try {
		if (matricula === null){
		return 	await prisma.usuario.findFirst()
		}
		const result = await prisma.usuario.findFirst({
			where: {
				matricula: matricula,
			},
		});
		if (result == null){
		return "Usuário não encontrado!"
		}
		return result;
	} catch (error) {
		console.error('Error ', error);
		return null;
	}
};

export const updateUsers = async (usuario: Usuario, matricula: string): Promise<Usuario | null> => {
	try {
		const result = await prisma.usuario.findFirst({
			where: {
				matricula: matricula,
			},
		});
		if (result === null) {
			return null;
		}

		const update = await prisma.usuario.update({
			where: {
				matricula: matricula,
			},
			data: {
				matricula: usuario.matricula,
				nome: usuario.nome,
				email: usuario.email,
				senha: usuario.senha,
				tipo: usuario.tipo,
				updatedAt: new Date(),
			}
		})
		return update;

	} catch (error) {
		console.error('Error ', error);
		return null;
	}
};
