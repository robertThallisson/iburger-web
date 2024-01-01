import { Component, OnInit } from '@angular/core';
import { Evento } from '../../../model/objetc/evento';
import { BaseInserir } from '../../../model/telas/base-inserir';
import { Base } from '../../../model/base';
import { EventoService } from '../../../service/pop-farma/evento.service';

@Component({
  selector: 'app-evento-inserir',
  templateUrl: './evento-inserir.page.html',
  styleUrls: ['./evento-inserir.page.scss'],
})
export class EventoInserirPage extends BaseInserir<Evento> implements OnInit {

  constructor(
    public base: Base,
    public service: EventoService,
  ) {
    super(base, service);
   }

  ngOnInit() {}

  beforeSave(): void {
    this.value.usuario = this.service.as.token.usuario;
  }
  afterSave(): void {

  }

  afterLoader(): void {
   // throw new Error('Method not implemented.');
  }
}
