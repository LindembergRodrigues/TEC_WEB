import { Role } from '../Enum/role.enum'
export interface UsuarioDTO {
	email: string;
	senha: string;
	tipo: Role;
}