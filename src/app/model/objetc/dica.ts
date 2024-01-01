import { Usuario } from './usuario';
export class Dica {
  id: number;
	imagem: any;
	link: string;
	texto: string;
	prioridade: boolean;
	ativo: boolean;
	usuario: Usuario;
	dataCadastro: any;
}
