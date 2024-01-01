import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DestaquesPage } from './destaques.page';

const routes: Routes = [
  {
    path: '',
    component: DestaquesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DestaquesPageRoutingModule {}
