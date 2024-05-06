import { Perfil } from '../enums/perfil';
import { Pessoa } from './pessoa';
export class Usuario {
    login: string;
    senha: string;
    pessoa: Pessoa;
    email: string;
    temEmpresa: boolean;
    dataCadastro: any;
    perfil: Perfil;
}
