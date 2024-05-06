import { Component, OnInit } from '@angular/core';
import { AutentificacaoService } from '../service/autentificacao/autentificacao.service';
import { Router } from '@angular/router';
import { Base } from '../model/base';
import { _isNullOrWhiteSpace } from '../funcoes/funcoes';
import { Preferences } from '@capacitor/preferences';
import { Perfil } from '../model/enums/perfil';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home',
    },
    {
      title: 'Eventos',
      url: '/eventos',
      icon: 'document-text',
    },
    {
      title: 'Banners',
      url: '/banners',
      icon: 'document-text',
    },
    {
      title: 'Dicas',
      url: '/dicas',
      icon: 'document-text',
    },
    {
      title: 'Destaques',
      url: '/destaques',
      icon: 'document-text',
    },
    {
      title: 'Perfil',
      url: '/destaques',
      icon: 'document-text',
    },
    {
      title: 'Promoções',
      url: '/promocoes',
      icon: 'document-text',
    },
    {
      title: 'Perfil',
      url: '/perfil',
      icon: 'document-text',
    }
  ];



  public appPagesFiscal = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home',
    },
    {
      title: 'Eventos',
      url: '/eventos',
      icon: 'document-text',
    },
    {
      title: 'Banners',
      url: '/banners',
      icon: 'document-text',
    },
    {
      title: 'Dicas',
      url: '/dicas',
      icon: 'document-text',
    },
    {
      title: 'Destaques',
      url: '/destaques',
      icon: 'document-text',
    },
    {
      title: 'Promoções',
      url: '/promocoes',
      icon: 'document-text',
    },
    {
      title: 'Perfil',
      url: '/perfil',
      icon: 'document-text',
    }
  ];

  public appPagesDefaut = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home',
    },
    {
      title: 'Eventos',
      url: '/eventos',
      icon: 'document-text',
    },
    {
      title: 'Perfil',
      url: '/perfil',
      icon: 'document-text',
    }
  ];
  constructor(
    public autentificacaoService: AutentificacaoService,
    private router: Router,
    private base: Base
  ) {

    if (autentificacaoService.token?.usuario?.perfil === Perfil.USUARIO) {

    }
    if (autentificacaoService.token?.usuario?.perfil === Perfil.GERENTE) {

    }
   }

  ngOnInit() {
  }


  async logout() {
    await Preferences.remove({ key: 'user'});
    this.autentificacaoService.logout();
    window.location.reload();
  }

  getImagem() {
    try {
      return this.autentificacaoService.token.usuario.pessoa.url ?
        this.autentificacaoService.token.usuario.pessoa.url : '/assets/img/user.png';
    } catch (error) {
      return '/assets/img/user.png';
    }
  }

  navegar(item: any) {
    if (_isNullOrWhiteSpace(item.children)) {
      this.router.navigate([item.url]);
    }

  }

  getNome() {
    try {
      return this.autentificacaoService.token.usuario.pessoa.nome;
    } catch (error) {
      return 'Visitante';
    }
  }


}
