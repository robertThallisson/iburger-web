import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { DataInputComponent } from './data-input.component';
import { BrMaskerModule } from 'br-mask';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core';
import {TooltipModule} from 'primeng/tooltip';
import { CalendarModule } from 'primeng/calendar';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BrMaskerModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    TooltipModule,
    CalendarModule
  ],
  declarations: [
    DataInputComponent
  ],
  exports: [
    DataInputComponent
  ]
})
export class DataInputModule { }
