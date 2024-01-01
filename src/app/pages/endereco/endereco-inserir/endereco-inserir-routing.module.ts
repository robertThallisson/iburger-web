import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnderecoInserirPage } from './endereco-inserir.page';

const routes: Routes = [
  {
    path: '',
    component: EnderecoInserirPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnderecoInserirPageRoutingModule {}
