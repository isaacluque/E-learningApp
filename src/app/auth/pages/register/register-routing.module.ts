import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register.component';
import { StudentRegisterComponent } from './components/student-register/student-register.component';
import { PymeRegisterComponent } from './components/pyme-register/pyme-register.component';

const routes: Routes = [
  {
    path: '',
    component: RegisterComponent,
    children: [
      {path: 'student-register', component: StudentRegisterComponent},
      {path: 'pyme-register', component: PymeRegisterComponent},
      {path: '**', redirectTo: ''},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule { }
