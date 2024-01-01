/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Base } from './../../model/base';
import {
  CanActivate,
  CanActivateChild,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AutentificacaoService } from './autentificacao.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
//import { NavegacaoService } from './navegacao.service';
import { MenuController } from '@ionic/angular';
import { _isNullOrWhiteSpace } from '../../funcoes/funcoes';

@Injectable({
  providedIn: 'root',
})
export class Guard implements CanActivate, CanActivateChild {
  public modulo: string = '';
  constructor(
    private router: Router,
    private as: AutentificacaoService,
    private base: Base,
   // private navegacaoService: NavegacaoService,
    private menu: MenuController
  ) {}
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {

    console.log(childRoute);
    console.log(state);
    return this.tratarNavegacao(childRoute, this.menu);
    /*
    if (this.navegacaoService.perguntarMudarPagina) {

      this.navegacaoService.perguntarMudarPagina = false;
      if (confirm('Deseja realmente sair da página')) {
        return this.tratarNavegacao(childRoute, this.menu);
      } else {
        return false;
      }
    } else {
     c
    }*/
  }



  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
      console.log(route);
    console.log(state);
    return this.tratarNavegacao(route, this.menu);
    /*
    if (this.navegacaoService.perguntarMudarPagina) {
      this.navegacaoService.perguntarMudarPagina = false;
      if (confirm('Deseja realmente sair da página')) {
        return this.tratarNavegacao(route, this.menu);
      } else {
        return false;
      }
    } else {
      return this.tratarNavegacao(route, this.menu);
    }*/
  }

  tratarNavegacao(route: ActivatedRouteSnapshot, menu: MenuController): boolean {
    if (_isNullOrWhiteSpace(this.as.token)) {
      this.router.navigate(['']);
      return false;
    }
    if (route.data && route.data.roles && !this.temAutorizacao(route.data.roles)) {

      if (this.as.token.login === 'cadastrar') {
        this.base.mensagemErro(
          'você deve estar logado para continuar '
        );
        this.router.navigate(['/cadastrar']);
        return false;

      } else {
        this.base.mensagemErro(
          'Acesso negado </br> voçe não autorização para acessar está tela '
        );
        return false;
      }

    }

    if (_isNullOrWhiteSpace(this.modulo)) {
      menu.close();
      return true;
    }

    let temModulo: boolean = false;
    /*
    if (!_isNullOrWhiteSpace(this.as.token.modulo)) {
      this.as.token.modulo.forEach((element) => {
        if (element.nome === this.modulo) {
          temModulo = true;
        }
      });
    }
    */

    if (!temModulo) {
      this.base.mensagemErro(
        'Acesso negado </br> Entre em contato com a MundoBitInfo - soluções ' +
          '</br> e adiquira já o modulo financeiro </br> fones </br> (62) 98641-5767 </br> (62) 98199-3111'
      );
    } else {
      menu.close();
    }

    return temModulo;
  }

  temAutorizacao(roles: []) {
    if (!this.as.tokenDecode.authorities) {
      return false;
    }
    for (const role of roles) {
      if (this.as.tokenDecode.authorities.includes(role)) {
        return true;
      }
    }
    return false;
  }
}
