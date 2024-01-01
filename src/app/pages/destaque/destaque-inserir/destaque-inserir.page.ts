import { Component, OnInit } from '@angular/core';
import { Destaque } from '../../../model/objetc/destaque';
import { DestaqueService } from '../../../service/pop-farma/destaque.service';
import { Base } from '../../../model/base';
import { BaseInserir } from '../../../model/telas/base-inserir';
@Component({
  selector: 'app-destaque-inserir',
  templateUrl: './destaque-inserir.page.html',
  styleUrls: ['./destaque-inserir.page.scss'],
})
export class DestaqueInserirPage extends BaseInserir<Destaque> implements OnInit {

  constructor(
    public base: Base,
    public service: DestaqueService,
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
