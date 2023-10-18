import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './pages/users/users.component';
import { DetailsComponent } from './pages/details/details.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path:'user',
        component: UsersComponent
      },
      {
        path:'user/details/:id_user',
        component: DetailsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }
