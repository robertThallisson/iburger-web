import { Pessoa } from './pessoa';
export class Endereco {
  id: any;
  geolocation: string;
  rua: string;
  bairro: string;
  numero: string;
  pessoa: Pessoa;
  principal: boolean;
}
