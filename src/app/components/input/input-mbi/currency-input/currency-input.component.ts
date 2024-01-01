/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable radix */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @angular-eslint/component-selector */
import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Base } from '../../../../model/base';
import { _isNullOrWhiteSpace, toMoney, toMoneyInput } from '../../../../funcoes/funcoes';
import { CurrencyPipe } from '@angular/common';

const noop = () => {};
@Component({
  selector: 'currency-mbi',
  templateUrl: './currency-input.component.html',
  styleUrls: ['./currency-input.component.scss'],
  providers: [MakeProvidert(CurrencyInputComponent)],
})
export class CurrencyInputComponent implements ControlValueAccessor, OnInit {
  @Input() label: string = 'item sem label';
  @Input() name: string;
  @Input() innerValue;

  @Input() readonly: boolean = false;

  @Output() ionChange = new EventEmitter<any>();
  valor: any;

  mask: any = {money: true,thousand: '.',  decimalCaracter: ',', decimal: '2'};
  @Input() inteiro: boolean = false;
  @Input() isRequired = false;
  passou: boolean = false;

  @Input() maxValue;


  @Input() money = false;
  @Input() percent = false;

  @Input() limpo: boolean = false;

  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;
  constructor(private base: Base, private currencyPipe: CurrencyPipe ) {}

  ngOnInit() {
    if (this.inteiro) {
      this.mask = {type: 'num'};
    }
  }
  get value(): any {
    return this.innerValue;
  }


  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
    }
  }

  onBlur() {
    this.onTouchedCallback();
  }

  // From ControlValueAccessor interface
  writeValue(value: any) {
    if (this.base._isNullOrWhiteSpace(value) ) {
      this.value = 0;
      this.valor = '';
    } else {
      if (isNaN(value)) {
        this.valor = '';
      } else {
        if (this.inteiro) {
          // tslint:disable-next-line: radix
          this.valor = parseInt(value);
        } else {
          this.valor = toMoneyInput(value, this.currencyPipe);
        }

      }
    }
  }

  // From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  // From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.readonly = isDisabled;
  }

  onChange(event: any) {
    console.log(event);
    this.value = this.base.toNumber(event.detail.value);
    this.ionChange.emit(event);
  }

  exibirMensagem(): boolean {
    return this.passou && !this.value && this.isRequired;
  }

  saiu(evento: any): void {
    this.passou = true;

    if (!_isNullOrWhiteSpace(this.maxValue) && (this.value >  Number(this.maxValue)) ) {
      this.value = Number(this.maxValue);
      this.valor = this.base.toNumber(Number(this.maxValue));
    }
  }

  getStyle() {
    return this.exibirMensagem() ?  '2px solid red' : '';
  }
}

export function MakeProvidert(type: any) {
  return {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => type),
    multi: true,
  };
}
