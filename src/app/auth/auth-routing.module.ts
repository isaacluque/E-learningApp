import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { LoginStudentComponent } from './pages/login-student/login-student.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginPymeComponent } from './pages/login-pyme/login-pyme.component';
import { LoginAdminComponent } from './pages/login-admin/login-admin.component';


const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {path: 'login-student', component: LoginStudentComponent},
      {path: 'login-pyme', component: LoginPymeComponent},
      {path: 'login-admin', component: LoginAdminComponent},
      {path: 'register', component: RegisterComponent},
      {path: '**', redirectTo: 'login-student'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
