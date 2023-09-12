import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { StudentRegisterComponent } from './components/student-register/student-register.component';
import { PymeRegisterComponent } from './components/pyme-register/pyme-register.component';
import { StudentComponent } from './components/student/student.component';


@NgModule({
  declarations: [
    StudentComponent
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule
  ]
})
export class RegisterModule { }
