import { Component, OnInit } from '@angular/core';
import { BaseDados } from '../../../model/telas/base-dados';
import { Base } from '../../../model/base';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { Evento } from '../../../model/objetc/evento';
import { EventoService } from '../../../service/pop-farma/evento.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.page.html',
  styleUrls: ['./eventos.page.scss'],
})
export class EventosPage extends BaseDados<Evento> implements OnInit {


  constructor(
    protected base: Base,
    protected confirmationService: ConfirmationService,
    protected router: Router,
    public thisService: EventoService,
  ) {
    super(base,confirmationService, router, thisService);
    this.urlInserir = 'evento-inserir';
    this.desativarUsandoAtivo = false;
  }

  ngOnInit() {
  }

  remover(item: Evento) {
    this.deletar(item);
  }

}
