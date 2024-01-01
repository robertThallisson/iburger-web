/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Usuario } from './../../model/objetc/usuario';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AutentificacaoService } from '../autentificacao/autentificacao.service';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends BaseService<Usuario> {

  private imagem: string = '/imagemusuario';

  constructor(
    public http: HttpClient,
    public as: AutentificacaoService,
  ) {
    super(http, as);
    this.url = '/usuario';
  }

  public salvarSoUsuario(usuario: Usuario) {
    return this.http.post(this.as.url + this.url + '/alterarsenha', usuario, this.as.getOptions());
  }

  public getToken(usuario: Usuario) {
    return this.http.post(this.as.url + this.as.urlToken, this.as.getBodyToken(usuario.email, usuario.senha), this.as.getOptionsToken());
  }

  public logar(usuario: Usuario) {
    return this.http.post(this.as.url + this.url + '/logar', usuario, this.as.getOptions());
  }
  public getImagem(id: any) {
    return this.http.get(this.as.url + this.url + this.imagem + '/' + id.toString(), this.as.getOptions());
  }

  public confirmaSenha(usuario: Usuario) {
    return this.http.post(this.as.url + this.url + '/confirmasenha', usuario, this.as.getOptions());
  }

  public esqueceuSenha(usuario: Usuario) {
    return this.http.post(this.as.url + this.url + '/esqueceusenha', usuario, this.as.getOptions());
  }
  public byusuario(value: string) {
    return this.http.post(this.as.url + this.url + '/byusuario', value, this.as.getOptions());
  }
}
