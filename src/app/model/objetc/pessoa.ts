import { Empresa } from './empresa';
import { Cidade } from './cidade';
import { Endereco } from './endereco';

export class Pessoa {
  id: any;
  nome: string;
  nomeFantasia: string;
  cpfCnpj: string;
  dataNascimento: any;
  rgIe: string;
  dataCadastro: any;
  telefone: string;
  cidade: Cidade;
  enderecos: Array<Endereco>;
  foto: any;
  url: string;
}
