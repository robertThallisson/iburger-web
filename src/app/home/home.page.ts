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

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  isLoading: boolean = false;


  private routerSub = Subscription.EMPTY;
  value = '';

  private inteval;
  constructor(
    public empresaService: EmpresaService,
    private base: Base,
    private router: Router,
    public platform: Platform,
    private androidPermissions: AndroidPermissions,
  ) {

  }
  ngOnDestroy(): void {
    //throw new Error('Method not implemented.');
  }
  ngOnInit(): void {

  }


}
