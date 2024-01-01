import { Empresa } from './empresa';
import { Usuario } from './usuario';
export class Promocao {
	id: number;
	imagem: any;
	link: string;
	bloqueio: boolean;
	ativo: boolean;
	usuario: Usuario;
  empresa: Empresa;
	texto: string;
	cupom: string;
	inicio: any;
	fim: any;
  nome: string;
	dataCadastro: any;
}
