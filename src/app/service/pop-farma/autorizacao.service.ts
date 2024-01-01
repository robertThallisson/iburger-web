import { AutentificacaoService } from './../autentificacao/autentificacao.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Autorizacao } from '../../model/objetc/autorizacao';

@Injectable({
  providedIn: 'root'
})
export class AutorizacaoService {

  private url: string = '/autorizacao';
  autorizacao: Autorizacao;

  constructor(private http: HttpClient, public as: AutentificacaoService) {}

  public autorizar(autorizacao: Autorizacao) {
    return this.http.post(
      this.as.url + this.url,
      autorizacao,
      this.as.getOptions()
    );
  }

}
