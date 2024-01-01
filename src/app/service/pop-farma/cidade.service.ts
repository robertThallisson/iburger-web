/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Cidade } from './../../model/objetc/cidade';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AutentificacaoService } from '../autentificacao/autentificacao.service';
@Injectable({
  providedIn: 'root'
})
export class CidadeService {
  private url: string = '/cidade';
  cidade: Cidade;

  constructor(private http: HttpClient, public as: AutentificacaoService) { }

  public salvar(cidade: Cidade) {
    return this.http.post(this.as.url + this.url, cidade, this.as.getOptions());
  }

  pesquisar(value: string) {
    return this.http.post(this.as.url + this.url + '/pesquisar', value, this.as.getOptions());
  }

  pesquisarByIbge(value: number) {
    return this.http.post(this.as.url + this.url + '/pesquisarbyibge', value, this.as.getOptions());
  }
  pesquisarUltimosRegistros() {
    return this.http.get(this.as.url + this.url + '/pesquisarultimosregistro', this.as.getOptions());
  }
}
