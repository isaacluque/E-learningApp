import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { StudentRegisterComponent } from './components/student-register/student-register.component';
import { PymeRegisterComponent } from './components/pyme-register/pyme-register.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RegisterRoutingModule
  ]
})
export class RegisterModule { }
