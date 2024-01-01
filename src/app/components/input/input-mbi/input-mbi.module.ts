import { RadioMbiComponent } from './radio-mbi/radio-mbi.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { InputMbiComponent } from './input-mbi.component';
import { CurrencyInputComponent } from './currency-input/currency-input.component';
import { BrMaskerModule } from 'br-mask';
import { MaskMbiComponent } from './mask-mbi/mask-mbi.component';
import { CurrencyDisplayComponent } from './currency-display/currency-display.component';
import { AdvancedComponent } from './advanced/advanced.component';
import { BasicCurrencyComponent } from './basic-currency/basic-currency.component';
import { TabMbiComponent } from './tab-mbi/tab-mbi.component';

@NgModule({
  declarations: [
    InputMbiComponent,
    CurrencyInputComponent,
    MaskMbiComponent,
    CurrencyDisplayComponent,
    AdvancedComponent,
    BasicCurrencyComponent,
    RadioMbiComponent,
    TabMbiComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BrMaskerModule
  ],
  exports: [
    InputMbiComponent,
    CurrencyInputComponent,
    MaskMbiComponent,
    CurrencyDisplayComponent,
    AdvancedComponent,
    BasicCurrencyComponent,
    RadioMbiComponent,
    TabMbiComponent
  ]
})
export class InputMbiModule { }
