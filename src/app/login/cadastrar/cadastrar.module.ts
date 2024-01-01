import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CadastrarPageRoutingModule } from './cadastrar-routing.module';

import { CadastrarPage } from './cadastrar.page';
import {MatTabsModule} from '@angular/material/tabs';
import { NativeGeocoder } from '@awesome-cordova-plugins/native-geocoder/ngx';
import { BrMaskerModule } from 'br-mask';
import { DataInputModule } from '../../components/data-input/data-input.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CadastrarPageRoutingModule,
    MatTabsModule,
    BrMaskerModule,
    DataInputModule
  ],
  declarations: [CadastrarPage],
  providers: [
    NativeGeocoder
  ]
})
export class CadastrarPageModule {}
