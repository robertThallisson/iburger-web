import { Component, OnInit } from '@angular/core';
import { Promocao } from '../../../model/objetc/promocao';
import { PromocaoService } from '../../../service/pop-farma/promocao.service';
import { Base } from '../../../model/base';
import { BaseInserir } from '../../../model/telas/base-inserir';
@Component({
  selector: 'app-promocao-inserir',
  templateUrl: './promocao-inserir.page.html',
  styleUrls: ['./promocao-inserir.page.scss'],
})
export class PromocaoInserirPage extends BaseInserir<Promocao> implements OnInit {
  constructor(
    public base: Base,
    public service: PromocaoService,
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
  }
}
