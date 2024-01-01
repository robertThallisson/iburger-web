import { Injectable } from '@angular/core';
import { Promocao } from '../../model/objetc/promocao';
import { BaseService } from '../base.service';
import { HttpClient } from '@angular/common/http';
import { AutentificacaoService } from '../autentificacao/autentificacao.service';

@Injectable({
  providedIn: 'root'
})
export class PromocaoService extends BaseService<Promocao>  {

  constructor(
    public http: HttpClient,
    public as: AutentificacaoService
  ) {
    super(http, as);
    this.url = '/promocao';
  }

}
