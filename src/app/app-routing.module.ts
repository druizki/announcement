import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  // {
  //   path: 'home',
  //   loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  // },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'notice/:id',
    loadChildren: () =>
      import('./pages/notice/detail/detail.module').then(
        (m) => m.DetailPageModule
      ),
  },
  {
    path: 'create',
    loadChildren: () =>
      import('./pages/notice/create/create.module').then(
        (m) => m.CreatePageModule
      ),
    canLoad: [AuthGuard],
  },
  {
    path: 'edit/:id',
    loadChildren: () =>
      import('./pages/notice/edit/edit.module').then((m) => m.EditPageModule),
    canLoad: [AuthGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
