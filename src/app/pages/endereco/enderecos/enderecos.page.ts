import { Component, OnInit } from '@angular/core';
import { EnderecoService } from '../../../service/pop-farma/endereco.service';
import { BaseDados } from '../../../model/telas/base-dados';
import { Endereco } from '../../../model/objetc/endereco';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { Base } from '../../../model/base';

@Component({
  selector: 'app-enderecos',
  templateUrl: './enderecos.page.html',
  styleUrls: ['./enderecos.page.scss'],
})
export class EnderecosPage extends BaseDados<Endereco> implements OnInit {


  constructor(
    protected base: Base,
    protected confirmationService: ConfirmationService,
    protected router: Router,
    public enderecoService: EnderecoService,
  ) {
    super(base,confirmationService, router, enderecoService);
    this.urlInserir = 'endereco-inserir';
    this.desativarUsandoAtivo = false;
  }

  ngOnInit() {
  }

  remover(item: Endereco) {
    this.deletar(item);
  }

}
