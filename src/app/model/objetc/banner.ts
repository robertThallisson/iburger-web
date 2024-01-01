import { Usuario } from './usuario';
import { Empresa } from './empresa';

export class Banner {
  id: number;
	imagem: any;
	link: string;
	ativo: boolean;
	usuario: Usuario;
	empresa: Empresa;
	texto: string;
	inicio: any;
	fim: any;
	dataCadastro: any;
}
