import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BannerInserirPage } from './banner-inserir.page';

const routes: Routes = [
  {
    path: '',
    component: BannerInserirPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BannerInserirPageRoutingModule {}
