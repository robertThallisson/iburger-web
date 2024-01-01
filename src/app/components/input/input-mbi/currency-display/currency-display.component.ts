import { Base } from '../../../../model/base';
import { Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

const noop = () => {
};
@Component({
  selector: 'app-currency-display',
  templateUrl: './currency-display.component.html',
  styleUrls: ['./currency-display.component.scss']
})
export class CurrencyDisplayComponent implements OnInit {

  @Input() innerValue;
  constructor(
    private base: Base
  ) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  
}


