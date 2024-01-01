import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DestaqueInserirPage } from './destaque-inserir.page';

const routes: Routes = [
  {
    path: '',
    component: DestaqueInserirPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DestaqueInserirPageRoutingModule {}
