import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { validateTokenAdminGuard } from './auth/guards/validate-token.guard';
import { isNotAuthenticatedGuard } from './auth/guards/is-not-authenticated.guard';

const routes: Routes = [
  {
    path: 'auth',
    canActivate: [isNotAuthenticatedGuard],
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'main',
    canActivate: [validateTokenAdminGuard],
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
