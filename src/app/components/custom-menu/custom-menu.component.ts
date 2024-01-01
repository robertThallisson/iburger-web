/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/member-ordering */
//import { NavegacaoService } from './../../service/autentificacao/navegacao.service';
import { Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { Base } from '../../model/base';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

const noop = () => {};
@Component({
  selector: 'custom-menu',
  templateUrl: './custom-menu.component.html',
  styleUrls: ['./custom-menu.component.scss'],
  providers: [MakeProvider(CustomMenuComponent)],
})
export class CustomMenuComponent
  implements ControlValueAccessor, OnInit, OnDestroy {
  @Input() pesquisar;
  @Input() pesquisarUltimos;

  @Input() nome: string;
  @Input() pageName: string;
  @Input() innerValue;
  @Input() habilitarFiltro: boolean = false;
  valueInput: string = '';
  itensCheck = [{nome: 'não filtar', value: null}, {nome: 'sim', value: true}, {nome: 'não', value: false}];

  filtro: boolean = false;

  @Input() service: any;
  @Input() ocultarFiltro: boolean = true;
  private _routerSub = Subscription.EMPTY;
  constructor(
    private base: Base,
    private router: Router,
    //private navegacaoService: NavegacaoService
  ) {
   // this.navegacaoService.lastPage = '';
    this._routerSub = this.router.events
    .pipe(filter(e => e instanceof NavigationEnd))
    .subscribe((e: NavigationEnd) => {
      if (this.router.url === '/' + this.pageName ) {
        this.buscarUltimosRegistros();
      }
    });
  }

  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  get value(): any {
    return this.innerValue;
  }

  //set accessor including call the onchange callback
  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
    }
  }

  //Set touched on blur
  onBlur() {
    this.onTouchedCallback();
  }

  //From ControlValueAccessor interface
  writeValue(value: any) {
    this.value = value;
    try {
      if (value.length === 0) {
        this.buscarUltimosRegistros();
      }
    } catch (error) {}
  }

  //From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  //From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  setDisabledState(isDisabled: boolean): void {}

  ngOnInit() {}

  ngOnDestroy() {
    this._routerSub.unsubscribe();
  }
  habilitarFiltros() {
    this.filtro = !this.filtro;
    console.log(this.service);
  }
  buscarUltimosRegistros() {
    this.base.present();
    this.pesquisarUltimos().subscribe(
      (data) => {
        this.value = data;
        this.base.dismiss();
      },
      (erro) => {
        this.base.dismiss();
        this.base.mensagemErro(
          ' Erro ao pesquisar ' +
            this.nome.toLowerCase() +
            ' ' +
            this.base.tratarErro(erro)
        );
      }
    );
  }

  pesquisarClick(value: string) {
    if (value === undefined || value === null || value === '') {
      value = ' ';
    }
    this.base.present();
    this.pesquisar(value).subscribe(
      (data) => {
        try {
          if (data.length === 0) {
            this.base.mensagemAlerta('Nenhum registro encontrado');
          }
        } catch (error) {}
        this.base.dismiss();
        this.value = data;
      },
      (erro) => {
        this.base.dismiss();
        this.base.mensagemErro(
          ' Erro ao pesquisar ' +
            this.nome.toLowerCase() +
            ' ' +
            this.base.tratarErro(erro)
        );
      }
    );
  }

  filtrar() {
    this.base.present();
    this.service.montarFiltro();
    this.service.filtrar().subscribe(
      (data) => {
        try {
          if (data.length === 0) {
            this.base.mensagemAlerta('Nenhum registro encontrado');
          }
        } catch (error) {}
        this.base.dismiss();
        this.value = data;
      },
      (erro) => {
        this.base.dismiss();
        this.base.mensagemErro(
          ' Erro ao pesquisar ' +
            this.nome.toLowerCase() +
            ' ' +
            this.base.tratarErro(erro)
        );
      }
    );
  }

  onKey(event: any) {
    if (event.keyCode === 13) {
      this.pesquisarClick(this.valueInput);
    }
  }

  teste(event: any) {
    console.log(event);
  }

  onSelectTipo(event:  any) {

  }
}

export function MakeProvider(type: any) {
  return {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => type),
    multi: true,
  };
}
