import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { Empresa } from '../../model/objetc/empresa';
import { HttpClient } from '@angular/common/http';
import { AutentificacaoService } from '../autentificacao/autentificacao.service';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService extends BaseService<Empresa> {

  constructor(
    public http: HttpClient,
    public as: AutentificacaoService
  ) {
    super(http, as);
    this.url = '/empresa';
  }

  pesquisarByIdCidade(idCidade: number) {
    return this.http.get<Array<Empresa>>(this.as.url + this.url + '/pesquisarbyidcidade/' + idCidade, this.as.getOptions());
  }
}
