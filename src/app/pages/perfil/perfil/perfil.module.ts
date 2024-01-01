import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilPageRoutingModule } from './perfil-routing.module';

import { PerfilPage } from './perfil.page';
import { InputMbiModule } from '../../../components/input/input-mbi/input-mbi.module';
import { SearchSelectableModule } from '../../../components/search-selectable/search-selectable.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilPageRoutingModule,
    InputMbiModule,
    SearchSelectableModule
  ],
  declarations: [PerfilPage]
})
export class PerfilPageModule {}
