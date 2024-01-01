import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BannerInserirPageRoutingModule } from './banner-inserir-routing.module';

import { BannerInserirPage } from './banner-inserir.page';
import { InputMbiModule } from '../../../components/input/input-mbi/input-mbi.module';
import { SearchSelectableModule } from '../../../components/search-selectable/search-selectable.module';
import { DataInputModule } from '../../../components/data-input/data-input.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BannerInserirPageRoutingModule,
    InputMbiModule,
    SearchSelectableModule,
    DataInputModule
  ],
  declarations: [BannerInserirPage]
})
export class BannerInserirPageModule {}
