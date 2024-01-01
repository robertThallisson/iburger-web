import { Injectable } from '@angular/core';
import { Endereco } from 'src/app/model/objetc/endereco';
import { BaseService } from '../base.service';
import { HttpClient } from '@angular/common/http';
import { AutentificacaoService } from '../autentificacao/autentificacao.service';
import { Pessoa } from '../../model/objetc/pessoa';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService extends BaseService<Endereco> {

  constructor(
    public http: HttpClient,
    protected autentificacaoService: AutentificacaoService
  ) {
    super(http, autentificacaoService);
    this.url = '/endereco';
  }

  pesquisarByPessoa(pessoa: Pessoa) {
    return this.http.post<Array<Endereco>>(this.as.url + this.url + '/pesquisar', pessoa, this.as.getOptions());
  }
}
