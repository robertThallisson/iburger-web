import { Component, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Base } from '../../../../model/base';

const noop = () => {};
@Component({
  selector: 'basic-currency',
  templateUrl: './basic-currency.component.html',
  styleUrls: ['./basic-currency.component.scss'],
  providers: [MakeProvidert(BasicCurrencyComponent)]
})
export class BasicCurrencyComponent implements ControlValueAccessor, OnInit{
  @ViewChild('currency', { static: true }) myCurrency: any;
  @Input() name: string;
  @Input() innerValue;

  @Input() readonly: boolean = false;

  @Output() ionChange = new EventEmitter<any>();
  valor: any;

  mask: any = {money: true};
  @Input() inteiro: boolean = false;

  @Input() zerarFocus = false;
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;
  constructor(private base: Base) {}

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
          this.valor = this.base.toNumber(value.toString());
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

  setFocus() {
    this.myCurrency.setFocus();
    if (this.zerarFocus) {
      this.value = 0;
      this.valor = '';
    }
  }

  selectedAll() {
    
  }

  eventFocus(event: any) {
    event.inputElement.select();
  }
}

export function MakeProvidert(type: any) {
  return {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => type),
    multi: true,
  };
}