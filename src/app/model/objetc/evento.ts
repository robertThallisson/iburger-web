import { Usuario } from './usuario';
import { Empresa } from './empresa';
export class Evento {
  id: number;
	imagem: any;
	link: string;
	nome: string;
	texto: string;
	prioridade: boolean;
	ativo: boolean;
	inicio: any;
	fim: any;
	dataCadastro: any;
	usuario: Usuario;
}
