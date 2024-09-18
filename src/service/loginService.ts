import { PrismaClient, Usuario } from '@prisma/client';
import { UsuarioDTO } from '../DTO/usuario.dto';
import { ResetSenha } from '../DTO/resetSenha.dto'
const bcrypt = require('bcrypt'); 

const prisma = new PrismaClient();

export const loginUser = async (usuario: UsuarioDTO): Promise<Usuario | null> => {
	if (Object.keys(usuario).length === 0) {
		console.error("Dados invalidados")
	}
	const usuarioLogin = await prisma.usuario.findFirst({
		where: {
			email: usuario.email,
			senha: await bcrypt.hash(usuario.senha,10),
		},
	});
	
	if(Object.keys(usuario).length === 0){
		console.log("Dados incorretos!")
	}
	return usuarioLogin;
};


export const resetarSenha = async (resetSenha:ResetSenha): Promise<boolean | null> => {
	try {
		const result = await prisma.usuario.findFirst({
			where: {
				matricula: resetSenha.matricula,
				senha: await bcrypt.hash(resetSenha.senha,10),
			},
		});
		if (result == null) { return false}

		await prisma.usuario.update({
			where: {
				matricula: resetSenha.matricula,
				senha: await bcrypt.hash(resetSenha.senha,10),
			},
			data: {
			  senha: await bcrypt.hash(resetSenha.novaSenha,10),
			},
		      });

		return true;
	} catch (error) {
		console.error('Error ', error);
		return null;
	}
};