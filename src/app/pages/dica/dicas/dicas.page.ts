import { Component, OnInit } from '@angular/core';
import { Dica } from '../../../model/objetc/dica';
import { DicaService } from '../../../service/pop-farma/dica.service';
import { BaseDados } from '../../../model/telas/base-dados';
import { Base } from '../../../model/base';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dicas',
  templateUrl: './dicas.page.html',
  styleUrls: ['./dicas.page.scss'],
})
export class DicasPage extends BaseDados<Dica> implements OnInit {


  constructor(
    protected base: Base,
    protected confirmationService: ConfirmationService,
    protected router: Router,
    public service: DicaService,
  ) {
    super(base,confirmationService, router, service);
    this.urlInserir = 'dica-inserir';
    this.desativarUsandoAtivo = false;
  }

  ngOnInit() {
  }

  remover(item: Dica) {
    this.deletar(item);
  }


}
