import { Component, OnInit } from '@angular/core';
import { Banner } from '../../../model/objetc/banner';
import { BannerService } from '../../../service/pop-farma/banner.service';
import { BaseDados } from '../../../model/telas/base-dados';
import { Base } from '../../../model/base';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
@Component({
  selector: 'app-banners',
  templateUrl: './banners.page.html',
  styleUrls: ['./banners.page.scss'],
})
export class BannersPage extends BaseDados<Banner> implements OnInit {


  constructor(
    protected base: Base,
    protected confirmationService: ConfirmationService,
    protected router: Router,
    public service: BannerService,
  ) {
    super(base,confirmationService, router, service);
    this.urlInserir = 'evento-inserir';
    this.desativarUsandoAtivo = false;
  }

  ngOnInit() {
  }

  remover(item: Banner) {
    this.deletar(item);
  }

}
