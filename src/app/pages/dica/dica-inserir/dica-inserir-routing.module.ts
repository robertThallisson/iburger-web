import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DicaInserirPage } from './dica-inserir.page';

const routes: Routes = [
  {
    path: '',
    component: DicaInserirPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DicaInserirPageRoutingModule {}
