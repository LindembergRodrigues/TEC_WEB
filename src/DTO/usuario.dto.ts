import {Role} from '../Enum/role.enum'
export interface UsuarioDTO {
	matricula: string;
	nome: string;
	email: string;
	senha: string;
	tipo: Role;
	createdAt: Date;
	updatedAt: Date;
      }