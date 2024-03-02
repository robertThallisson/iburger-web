import { Injectable } from '@angular/core';
import { Banner } from '../../model/objetc/banner';
import { BaseService } from '../base.service';
import { HttpClient } from '@angular/common/http';
import { AutentificacaoService } from '../autentificacao/autentificacao.service';
@Injectable({
  providedIn: 'root'
})
export class BannerService extends BaseService<Banner>  {

  constructor(
    public http: HttpClient,
    public as: AutentificacaoService
  ) {
    super(http, as);
    this.url = '/banner';
  }
}
