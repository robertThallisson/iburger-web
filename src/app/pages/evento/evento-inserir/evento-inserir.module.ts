import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventoInserirPageRoutingModule } from './evento-inserir-routing.module';

import { EventoInserirPage } from './evento-inserir.page';
import { InputMbiModule } from '../../../components/input/input-mbi/input-mbi.module';
import { SearchSelectableModule } from '../../../components/search-selectable/search-selectable.module';
import { DataInputModule } from '../../../components/data-input/data-input.module';
import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventoInserirPageRoutingModule,
    InputMbiModule,
    SearchSelectableModule,
    DataInputModule,
    ImageCropperModule
  ],
  declarations: [EventoInserirPage]
})
export class EventoInserirPageModule {}
