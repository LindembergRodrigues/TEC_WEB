import { Role } from '../Enum/role.enum'
export interface UsuarioDTO {
	matricula: string;
	senha: string;
	tipo: Role;
}
