import { Base } from './../../model/base';
import { AutentificacaoService } from './autentificacao.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Guard } from './guard';
import { MenuController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService extends Guard implements CanActivate {
  constructor(
    router: Router,
    as: AutentificacaoService,
    base: Base,
    menu: MenuController
  ) {
    super(router, as, base, menu);
    this.modulo = '';
  }
}
