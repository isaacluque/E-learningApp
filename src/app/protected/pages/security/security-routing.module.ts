import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './pages/users/users.component';
import { DetailsComponent } from './pages/details/details.component';
import { validateTokenAdminGuard } from 'src/app/auth/guards/validate-token.guard';
import { RoleComponent } from './pages/role/role.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path:'user',
        component: UsersComponent,
        canActivate: [validateTokenAdminGuard],
        canLoad: [validateTokenAdminGuard]
      },
      {
        path:'user/details/:id_user',
        component: DetailsComponent,
        canActivate: [validateTokenAdminGuard],
        canLoad: [validateTokenAdminGuard]
      },
      {
        path: 'role',
        component: RoleComponent
      },
      {
        path: '**',
        redirectTo: 'user'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }
