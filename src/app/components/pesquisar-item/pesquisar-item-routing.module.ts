import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PesquisarItemPage } from './pesquisar-item.page';

const routes: Routes = [
  {
    path: '',
    component: PesquisarItemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PesquisarItemPageRoutingModule {}
