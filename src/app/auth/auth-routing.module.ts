import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { LoginAdminComponent } from './pages/login-admin/login-admin.component';
import { RegisterStudentComponent } from './pages/register-student/register-student.component';
import { RegisterPymeComponent } from './pages/register-pyme/register-pyme.component';


const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {path: 'login', component: LoginAdminComponent},
      {path: 'register/register-student', component: RegisterStudentComponent},
      {path: 'register/register-pyme', component: RegisterPymeComponent},
      {path: '**', redirectTo: 'login'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
