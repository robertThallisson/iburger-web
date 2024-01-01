import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventoInserirPage } from './evento-inserir.page';

const routes: Routes = [
  {
    path: '',
    component: EventoInserirPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventoInserirPageRoutingModule {}
