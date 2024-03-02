import { Promocao } from './../model/objetc/promocao';
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { EmpresaService } from '../service/pop-farma/empresa.service';
import { Base } from '../model/base';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { StatusPedido } from '../model/enums/status-pedido.enum';
import { toMoment, delay, _isNullOrWhiteSpace } from '../funcoes/funcoes';

import { LocalNotifications as LocalNotificationsWeb } from '@capacitor/local-notifications';
import { Platform } from '@ionic/angular';

import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import { PromocaoService } from '../service/pop-farma/promocao.service';
import { EventoService } from '../service/pop-farma/evento.service';
import { DestaqueService } from '../service/pop-farma/destaque.service';
import { DicaService } from '../service/pop-farma/dica.service';
import { BannerService } from '../service/pop-farma/banner.service';
import { Evento } from '../model/objetc/evento';
import { Destaque } from '../model/objetc/destaque';
import { Dica } from '../model/objetc/dica';
import { Banner } from '../model/objetc/banner';
import { Empresa } from '../model/objetc/empresa';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  isLoading: boolean = false;


  private routerSub = Subscription.EMPTY;
  value = '';

  promocoes: Array<Promocao>;
  eventos: Array<Evento>;
  destaques: Array<Destaque>;
  dicas: Array<Dica>;
  banners: Array<Banner>;
  empresas: Array<Empresa>;


  indexEventos = 0;
  eventoAtual;

  indexPromocao = 0;
  promocaoAtual;


  indexDestaque = 0;
  destaqueAtual;


  indexDica = 0;
  dicaAtual;


  indexBanner = 0;
  bannerAtual;


  indexEmpresa = 0;
  empresaAtual;

  responsiveOptions: any[] | undefined;

  constructor(
    public empresaService: EmpresaService,
    private base: Base,
    private router: Router,
    public platform: Platform,
    private androidPermissions: AndroidPermissions,
    private promocaoService: PromocaoService,
    private eventoService: EventoService,
    private destaqueService: DestaqueService,
    private dicaService: DicaService,
    private bannerService: BannerService
  ) {

  }
  ngOnDestroy(): void {
    //throw new Error('Method not implemented.');
  }
  ngOnInit(): void {


    this.empresaService.getByCidade().subscribe(
      data => {
        this.empresas = data;
      },
      erro => {
        this.base.mensagemErro('Erro ao consultar hamburguerias', erro);
      }
    );

    this.eventoService.getByCidade().subscribe(
      data => {
        this.eventos = data;
        setTimeout( () => {
        this.atualizar();
        }, 500);
      },
      erro => {
        this.base.mensagemErro('Erro ao consultar eventos', erro);
      }
    );

    this.promocaoService.getByCidade().subscribe(
      data => {
        this.promocoes = data;
      },
      erro => {
        this.base.mensagemErro('Erro ao consultar promoções', erro);
      }
    );

    this.destaqueService.getByCidade().subscribe(
      data => {
        this.destaques = data;
      },
      erro => {
        this.base.mensagemErro('Erro ao consultar destaques', erro);
      }
    );

    this.dicaService.getByCidade().subscribe(
      data => {
        this.dicas = data;
      },
      erro => {
        this.base.mensagemErro('Erro ao consultar dicas', erro);
      }
    );

    this.bannerService.getByCidade().subscribe(
      data => {
        this.banners = data;

      },
      erro => {
        this.base.mensagemErro('Erro ao consultar banners', erro);
      }
    );


    this.responsiveOptions = [
      {
          breakpoint: '1199px',
          numVisible: 1,
          numScroll: 1
      },
      {
          breakpoint: '991px',
          numVisible: 2,
          numScroll: 1
      },
      {
          breakpoint: '767px',
          numVisible: 1,
          numScroll: 1
      }
  ];

  }



  async atualizar() {


      while (true) {

        if (!_isNullOrWhiteSpace(this.eventos)) {
          this.eventoAtual =  this.eventos[this.indexEventos];
          this.indexEventos++;
          if(this.indexEventos === this.eventos.length) {
            this.indexEventos = 0;
          }
        }

        if (!_isNullOrWhiteSpace(this.dicas)) {
          this.dicaAtual =  this.dicas[this.indexDica];
          this.indexDica++;
          if(this.indexDica === this.dicas.length) {
            this.indexDica = 0;
          }
        }

        if (!_isNullOrWhiteSpace(this.banners)) {
          this.bannerAtual =  this.banners[this.indexBanner];
          this.indexBanner++;
          if(this.indexBanner === this.banners.length) {
            this.indexBanner = 0;
          }
        }


        await delay(5000);
      }

  }

  getImagen(value) {
    if(_isNullOrWhiteSpace(value)) {
      return '/assets/imagens/hamburguer.webp';
    } else {
      return value.link;
    }
  }

  getImagen2(value) {
    if(_isNullOrWhiteSpace(value)) {
      return '/assets/imagens/hamburguer.webp';
    } else {
      return value.link;
    }
  }
}
