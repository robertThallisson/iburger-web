import { Base } from 'src/app/model/base';
import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { _isNullOrWhiteSpace, getValueField } from '../../../../funcoes/funcoes';


const noop = () => {
};
@Component({
  selector: 'radio-mbi',
  templateUrl: './radio-mbi.component.html',
  styleUrls: ['./radio-mbi.component.scss'],
  providers: [MakeProvider(RadioMbiComponent)]
})
export class RadioMbiComponent implements ControlValueAccessor, OnInit {

  
  @Input() innerValue;

  @Input() label: string = 'item sem label';
  @Input() fieldValue: string = 'valor';
  @Input() fieldName: string = 'nome';
  @Input() multiplo: boolean = false;
  constructor(
    private base: Base
  ) { }

  ngOnInit() {}

  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  get value(): any {
    return this.innerValue;
  }

  // set accessor including call the onchange callback
  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
    }
  }

  // Set touched on blur
  onBlur() {
    this.onTouchedCallback();
  }

  // From ControlValueAccessor interface
  writeValue(value: any) {
    this.value = value;
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

  }

  onClick(index: number) {
    if (this.multiplo) {
      this.value[index][this.fieldValue] = _isNullOrWhiteSpace(this.value[index][this.fieldValue]) ? true : !this.value[index][this.fieldValue];
    } else {
      this.value.forEach(element => {
        element[this.fieldValue] =  false;
      });
      this.value[index][this.fieldValue] = true;
    }
  }

  getNome(item: any) {
    return getValueField(item, this.fieldName);
  }

}


export function MakeProvider(type: any) {
  return {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => type),
    multi: true
  };
}