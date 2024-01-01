
import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

const noop = () => {
};
@Component({
  selector: 'tab-mbi',
  templateUrl: './tab-mbi.component.html',
  styleUrls: ['./tab-mbi.component.scss'],
  providers: [MakeProvider(TabMbiComponent)]
})
export class TabMbiComponent implements OnInit {

  @Input() innerValue;

  @Input() labels = [];
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

  selecionarDiv(index: number) {
    this.value = index;
  }

}



export function MakeProvider(type: any) {
  return {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => type),
    multi: true
  };
}

