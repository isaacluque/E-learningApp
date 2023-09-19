import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { RegisterComponent } from './pages/register/register.component';
import { StudentRegisterComponent } from './pages/register/components/student-register/student-register.component';
import { PymeRegisterComponent } from './pages/register/components/pyme-register/pyme-register.component';
import { LoginAdminComponent } from './pages/login-admin/login-admin.component';


@NgModule({
  declarations: [
    AuthLayoutComponent,
    RegisterComponent,
    StudentRegisterComponent,
    PymeRegisterComponent,
    LoginAdminComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class AuthModule { }
