import { Usuario } from './usuario';
import { Empresa } from './empresa';

export class Destaque {
  id: number;
	imagem: any;
	link: string;
	prioridade: boolean;
	ativo: boolean;
	usuario: Usuario;
	empresa: Empresa;
	texto: string;
	inicio: any;
	fim: any;
	dataCadastro: any;
}
