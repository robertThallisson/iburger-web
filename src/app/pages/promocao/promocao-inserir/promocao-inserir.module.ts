import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PromocaoInserirPageRoutingModule } from './promocao-inserir-routing.module';

import { PromocaoInserirPage } from './promocao-inserir.page';
import { InputMbiModule } from '../../../components/input/input-mbi/input-mbi.module';
import { SearchSelectableModule } from '../../../components/search-selectable/search-selectable.module';
import { DataInputModule } from '../../../components/data-input/data-input.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PromocaoInserirPageRoutingModule,
    InputMbiModule,
    SearchSelectableModule,
    DataInputModule
  ],
  declarations: [PromocaoInserirPage]
})
export class PromocaoInserirPageModule {}
