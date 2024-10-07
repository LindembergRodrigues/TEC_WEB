import { PrismaClient, Usuario } from '@prisma/client';
import { UsuarioDTO } from '../DTO/usuario.dto';
import { ResetSenha } from '../DTO/resetSenha.dto'
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const loginUser = async (usuario: UsuarioDTO): Promise<Usuario | null > => {
	if (Object.keys(usuario).length === 0) {
		console.error("Dados invalidados")
	}
	const usuarioLogin = await prisma.usuario.findFirst({
		where: {
			matricula: usuario.matricula
		},
	});
	
	if(usuarioLogin == null ||  !await bcrypt.compare(usuario.senha, usuarioLogin.senha)){
		return  null;
	}
	return usuarioLogin;
};


export const resetarSenha = async (resetSenha:ResetSenha): Promise<boolean | null | string> => {
	try {
		const result = await prisma.usuario.findFirst({
			where: {
				matricula: resetSenha.matricula,
			},
		});
		if(result == null || await !bcrypt.compare(result.senha, resetSenha.senha)){
			return  "Dados incorretos!";
		}

		await prisma.usuario.update({
			where: {
				matricula: resetSenha.matricula,
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