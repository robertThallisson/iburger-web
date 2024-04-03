import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilUsuarioInserirPage } from './perfil-usuario-inserir.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilUsuarioInserirPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilUsuarioInserirPageRoutingModule {}
