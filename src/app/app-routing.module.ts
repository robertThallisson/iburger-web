import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './service/autentificacao/auth-guard-service.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./menu/menu.module').then( m => m.MenuPageModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'home',
    redirectTo: 'menu',
    pathMatch: 'full',
  },
  {
    path: 'cadastrar',
    loadChildren: () => import('./login/cadastrar/cadastrar.module').then( m => m.CadastrarPageModule),
  },
  {
    path: 'eventos',
    loadChildren: () => import('./pages/evento/eventos/eventos.module').then( m => m.EventosPageModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'evento-inserir',
    loadChildren: () => import('./pages/evento/evento-inserir/evento-inserir.module').then( m => m.EventoInserirPageModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'banners',
    loadChildren: () => import('./pages/banner/banners/banners.module').then( m => m.BannersPageModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'banner-inserir',
    loadChildren: () => import('./pages/banner/banner-inserir/banner-inserir.module').then( m => m.BannerInserirPageModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'destaques',
    loadChildren: () => import('./pages/destaque/destaques/destaques.module').then( m => m.DestaquesPageModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'destaque-inserir',
    loadChildren: () => import('./pages/destaque/destaque-inserir/destaque-inserir.module').then( m => m.DestaqueInserirPageModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'dicas',
    loadChildren: () => import('./pages/dica/dicas/dicas.module').then( m => m.DicasPageModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'dica-inserir',
    loadChildren: () => import('./pages/dica/dica-inserir/dica-inserir.module').then( m => m.DicaInserirPageModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'promocoes',
    loadChildren: () => import('./pages/promocao/promocoes/promocoes.module').then( m => m.PromocoesPageModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'promocao-inserir',
    loadChildren: () => import('./pages/promocao/promocao-inserir/promocao-inserir.module').then( m => m.PromocaoInserirPageModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'visualizacao',
    loadChildren: () => import('./pages/visualizacao/visualizacao.module').then( m => m.VisualizacaoPageModule)
  },
  {
    path: 'perfil-usuario-inserir',
    loadChildren: () => import('./pages/perfil-usuario/perfil-usuario-inserir/perfil-usuario-inserir.module').then( m => m.PerfilUsuarioInserirPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
