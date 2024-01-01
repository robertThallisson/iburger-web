import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { HttpClient } from '@angular/common/http';
import { AutentificacaoService } from '../autentificacao/autentificacao.service';
import { Dica } from '../../model/objetc/dica';
@Injectable({
  providedIn: 'root'
})
export class DicaService extends BaseService<Dica>  {

  constructor(
    public http: HttpClient,
    public as: AutentificacaoService
  ) {
    super(http, as);
    this.url = '/dica';
  }

}
