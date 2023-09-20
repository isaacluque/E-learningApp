import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { LoginAdminComponent } from './pages/login-admin/login-admin.component';
import { RegisterStudentComponent } from './pages/register-student/register-student.component';
import { RegisterPymeComponent } from './pages/register-pyme/register-pyme.component';


@NgModule({
  declarations: [
    AuthLayoutComponent,
    LoginAdminComponent,
    RegisterStudentComponent,
    RegisterPymeComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class AuthModule { }
