import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CustomMenuComponent } from './custom-menu.component';
import { DataInputModule } from '../data-input/data-input.module';
import { SearchSelectableModule } from '../search-selectable/search-selectable.module';
import { InputMbiModule } from '../input/input-mbi/input-mbi.module';
import {MatSelectModule} from '@angular/material/select';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DataInputModule,
    InputMbiModule,
    SearchSelectableModule,
    MatSelectModule
  ],
  declarations: [
    CustomMenuComponent
  ],
  exports: [
    CustomMenuComponent
  ]
})
export class CustomMenuModule { }
