import { Component, OnInit } from '@angular/core';
import { Promocao } from '../../../model/objetc/promocao';
import { PromocaoService } from '../../../service/pop-farma/promocao.service';
import { BaseDados } from '../../../model/telas/base-dados';
import { Base } from '../../../model/base';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
@Component({
  selector: 'app-promocoes',
  templateUrl: './promocoes.page.html',
  styleUrls: ['./promocoes.page.scss'],
})
export class PromocoesPage extends BaseDados<Promocao> implements OnInit {


  constructor(
    protected base: Base,
    protected confirmationService: ConfirmationService,
    protected router: Router,
    public service: PromocaoService,
  ) {
    super(base,confirmationService, router, service);
    this.urlInserir = 'promocao-inserir';
    this.desativarUsandoAtivo = false;
  }

  ngOnInit() {
  }

  remover(item: Promocao) {
    this.deletar(item);
  }
}
