import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { HttpClient } from '@angular/common/http';
import { AutentificacaoService } from '../autentificacao/autentificacao.service';
import { Destaque } from '../../model/objetc/destaque';

@Injectable({
  providedIn: 'root'
})
export class DestaqueService extends BaseService<Destaque>  {

  constructor(
    public http: HttpClient,
    public as: AutentificacaoService
  ) {
    super(http, as);
    this.url = '/destaque';
  }
}
