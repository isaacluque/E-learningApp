import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { validateTokenAdminGuard } from './auth/guards/validate-token.guard';
import { isNotAuthenticatedGuard } from './auth/guards/is-not-authenticated.guard';
import { isAuthenticatedGuard } from './auth/guards/is-authenticated.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'main',
    canActivate: [isAuthenticatedGuard, validateTokenAdminGuard],
    canLoad: [isAuthenticatedGuard, validateTokenAdminGuard],
    loadChildren: () => import('./protected/protected.module'). then(m => m.ProtectedModule)
  },
  {
    path: '**',
    redirectTo: 'auth'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
