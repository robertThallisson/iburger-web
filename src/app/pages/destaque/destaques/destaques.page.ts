import { Component, OnInit } from '@angular/core';
import { Destaque } from '../../../model/objetc/destaque';
import { DestaqueService } from '../../../service/pop-farma/destaque.service';
import { BaseDados } from '../../../model/telas/base-dados';
import { Base } from '../../../model/base';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
@Component({
  selector: 'app-destaques',
  templateUrl: './destaques.page.html',
  styleUrls: ['./destaques.page.scss'],
})
export class DestaquesPage extends BaseDados<Destaque> implements OnInit {


  constructor(
    protected base: Base,
    protected confirmationService: ConfirmationService,
    protected router: Router,
    public service: DestaqueService,
  ) {
    super(base,confirmationService, router, service);
    this.urlInserir = 'evento-inserir';
    this.desativarUsandoAtivo = false;
  }

  ngOnInit() {
  }

  remover(item: Destaque) {
    this.deletar(item);
  }

}
