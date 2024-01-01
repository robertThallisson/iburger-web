/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AutentificacaoService } from './autentificacao/autentificacao.service';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService<T> {
  public url: string = '';
  public value: T;
  constructor(
    public http: HttpClient,
    public as: AutentificacaoService
  ) {

  }
  salvar(value: T) {
    return this.http.post<T>(this.as.url + this.url, value, this.as.getOptions());
  }

  pesquisar(value: string) {
    return this.http.post<Array<T>>(this.as.url + this.url + '/pesquisar', value, this.as.getOptions());
  }
  pesquisarUltimosRegistros() {
    return this.http.get<Array<T>>(this.as.url + this.url + '/pesquisarultimosregistro', this.as.getOptions());
  }

  remover(value: T, id: string = 'id') {
    return this.http.delete<any>(this.as.url + this.url + '/remover/' + value[id], this.as.getOptions());
  }

}
