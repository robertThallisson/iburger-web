import { FilterReportComponent } from './filter-report.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataInputModule } from '../data-input/data-input.module';
import { SearchSelectableModule } from '../search-selectable/search-selectable.module';
import { InputMbiModule } from '../input/input-mbi/input-mbi.module';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    FilterReportComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DataInputModule,
    InputMbiModule,
    SearchSelectableModule
  ],
  exports: [
    FilterReportComponent
  ]
})
export class FilterReportModule { }
