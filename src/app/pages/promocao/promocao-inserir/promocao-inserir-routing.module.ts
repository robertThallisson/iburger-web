import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PromocaoInserirPage } from './promocao-inserir.page';

const routes: Routes = [
  {
    path: '',
    component: PromocaoInserirPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PromocaoInserirPageRoutingModule {}
