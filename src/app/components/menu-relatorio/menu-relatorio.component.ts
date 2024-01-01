import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Pesquisa } from '../../model/objetc/filtro/pesquisa';

const noop = () => {
};
@Component({
  selector: 'app-menu-relatorio',
  templateUrl: './menu-relatorio.component.html',
  styleUrls: ['./menu-relatorio.component.scss'],
  providers: [MakeProvider(MenuRelatorioComponent)]
})
export class MenuRelatorioComponent implements ControlValueAccessor, OnInit {
  filtro: boolean = false;
  nome: string;
  constructor() { }

  clausulas: Array<Pesquisa> = [];
  get value(): any {
    return this.innerValue;
  }

  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
    }
  }
  @Input() innerValue;

  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;
  ngOnInit() {}


  onBlur() {
    this.onTouchedCallback();
  }


  writeValue(value: any) {
    this.value = value;
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  setDisabledState(isDisabled: boolean): void {

  }

  habilitarFiltro(){
    this.filtro = !this.filtro;
  }


}

export function MakeProvider(type: any) {
  return {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => type),
    multi: true
  };
}
