import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DicaInserirPageRoutingModule } from './dica-inserir-routing.module';

import { DicaInserirPage } from './dica-inserir.page';

import { InputMbiModule } from '../../../components/input/input-mbi/input-mbi.module';
import { SearchSelectableModule } from '../../../components/search-selectable/search-selectable.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DicaInserirPageRoutingModule,
    InputMbiModule,
    SearchSelectableModule
  ],
  declarations: [DicaInserirPage]
})
export class DicaInserirPageModule {}
