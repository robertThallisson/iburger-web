import { Usuario } from '../objetc/usuario';
import { Empresa } from '../objetc/empresa';
export class Token {
    access_token: string;
    token_type: string;
    expires_in: number;
    scope: string;
    nome: string;
    sti: string;
    usuario: Usuario;
    login: string;
    empresa: Empresa;
    refresh_token: any;
}
