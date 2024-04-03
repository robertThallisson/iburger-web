import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilUsuarioInserirPageRoutingModule } from './perfil-usuario-inserir-routing.module';

import { PerfilUsuarioInserirPage } from './perfil-usuario-inserir.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilUsuarioInserirPageRoutingModule
  ],
  declarations: [PerfilUsuarioInserirPage]
})
export class PerfilUsuarioInserirPageModule {}
