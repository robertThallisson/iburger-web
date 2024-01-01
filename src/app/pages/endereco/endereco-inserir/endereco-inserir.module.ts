import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnderecoInserirPageRoutingModule } from './endereco-inserir-routing.module';

import { EnderecoInserirPage } from './endereco-inserir.page';
import { InserirEnderecoModule } from './inserir-endereco/inserir-endereco.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnderecoInserirPageRoutingModule,
    InserirEnderecoModule
  ],
  declarations: [EnderecoInserirPage]
})
export class EnderecoInserirPageModule {}
