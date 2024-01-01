/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, forwardRef, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const noop = () => {
};
@Component({
  selector: 'input-mbi',
  templateUrl: './input-mbi.component.html',
  styleUrls: ['./input-mbi.component.scss'],
  providers: [MakeProvider(InputMbiComponent)]
})
export class InputMbiComponent implements ControlValueAccessor, OnInit {

  @Input() label: string = 'item sem label';
  @Input() name: string;
  @Input() innerValue;
  @Input() type = 'text';
  @Input() mask = {type: 'all', userCaracters: true};
  @Input() isRequired = false;
  @Input() readonly: boolean = false;

  @Input() notUpperCase: boolean = true;

  @Output() ionChange = new EventEmitter<any>();
  passou: boolean = false;
  constructor() { }

  ngOnInit() {}

  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  get value(): any {
    return this.innerValue;
  }

  //set accessor including call the onchange callback
  set value(v: any) {
    if (v !== this.innerValue) {
      if (v!== null && v !== undefined) {
        if (this.notUpperCase) {
          this.innerValue = v;
          this.onChangeCallback(v);
        } else {
          this.innerValue = v.toUpperCase();
          this.onChangeCallback(v.toUpperCase());
        }

      } else {
        this.innerValue = v;
        this.onChangeCallback(v);
      }
    }
  }

  //Set touched on blur
  onBlur() {

    this.onTouchedCallback();
  }

  //From ControlValueAccessor interface
  writeValue(value: any) {
    if (value!== null && value !== undefined) {
      if (this.notUpperCase) {
        this.value = value;
      } else {
        this.value = value.toUpperCase();
      }
    } else {
      this.value = value;
    }

  }

  //From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  //From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  setDisabledState(isDisabled: boolean): void {

  }

  exibirMensagem(): boolean {
    return this.passou && !this.value && this.isRequired;
  }

  saiu(evento: any): void {
    this.passou = true;
  }

  getStyle() {
    return this.exibirMensagem() ?  '2px solid red' : '';
  }

  onChange(event: any) {
    this.ionChange.emit(event);
  }
}


export function MakeProvider(type: any) {
  return {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => type),
    multi: true
  };
}
