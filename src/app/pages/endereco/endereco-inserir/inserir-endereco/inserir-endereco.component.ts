/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, Input, OnInit } from '@angular/core';
import { BaseInserir } from '../../../../model/telas/base-inserir';
import { Endereco } from '../../../../model/objetc/endereco';
import { EnderecoService } from '../../../../service/pop-farma/endereco.service';
import { Base } from '../../../../model/base';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-inserir-endereco',
  templateUrl: './inserir-endereco.component.html',
  styleUrls: ['./inserir-endereco.component.scss'],
})
export class InserirEnderecoComponent extends BaseInserir<Endereco> implements OnInit {

  @Input() modal: boolean = false;
  constructor(
    public base: Base,
    public enderecoService: EnderecoService,
    private modalController: ModalController
  ) {
    super(base, enderecoService);
   }

  ngOnInit() {}

  beforeSave(): void {
    this.value.pessoa = this.enderecoService.as.token.usuario.pessoa;
  }
  afterSave(): void {
    if (this.modal) {
      this.modalController.dismiss({ dismiss: true, valor: 'add' });
    }
  }
}
