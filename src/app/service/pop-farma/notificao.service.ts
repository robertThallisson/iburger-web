import { Notificacao } from './../../model/objetc/notificacao';
import { _isNullOrWhiteSpace } from '../../funcoes/funcoes';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AutentificacaoService } from '../autentificacao/autentificacao.service';

@Injectable({
  providedIn: 'root'
})
export class NotificaoService {
  private url: string = '/notificacao';
  public notificacoes: Array<Notificacao> = new Array<Notificacao>();

  constructor(private http: HttpClient, public as: AutentificacaoService) {}

  pesquisar(value: string) {
    return this.http.post(
      this.as.url + this.url + '/pesquisar',
      value,
      this.as.getOptions()
    );
  }


  pesquisarUltimosRegistros() {
    return this.http.get(
      this.as.url + this.url + '/pesquisarultimosregistro',
      this.as.getOptions()
    );
  }

  buscarNotificacoes() {
    this.pesquisarUltimosRegistros().subscribe(
      data => {
        this.notificacoes = data as Array<Notificacao>;
        if (_isNullOrWhiteSpace(this.notificacoes)) {
          this.notificacoes = []
        }

        let notificacao = new Notificacao();
        notificacao.mensagem = 'você esta na versão 2.0 , com um controle de seu financeiro \n '+ 
        ' agora temos pedidos de compra, contas a pagar , contas a receber, venda de produtos, valores definidos por procedimentos e muito mais,  \n ' + 
        '  caso tenha alguma duvida entre em contato com o suporte';
        this.notificacoes.push(notificacao);

        notificacao = new Notificacao();
        notificacao.mensagem = 'Agora você pode receber atraves do PIX \n ' + 
        'cadastre sua chave nas configurações e receba pagamentos atraves do PIX \n ' ;
        this.notificacoes.push(notificacao);
      },
      error => {
        console.log(error);
      }
    );
  }
}
