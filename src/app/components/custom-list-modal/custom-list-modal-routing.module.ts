import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomListModalPage } from './custom-list-modal.page';

const routes: Routes = [
  {
    path: '',
    component: CustomListModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomListModalPageRoutingModule {}
