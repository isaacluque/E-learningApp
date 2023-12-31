import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecurityRoutingModule } from './security-routing.module';
import { UsersComponent } from './pages/users/users.component';
import { DeleteUserComponent } from './pages/users/components/delete-user/delete-user.component';
import { CreateUserComponent } from './pages/users/components/create-user/create-user.component';
import { MaterialModule } from 'src/app/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DetailsComponent } from './pages/details/details.component';
import { RoleComponent } from './pages/role/role.component';
import { EditUserComponent } from './pages/users/components/edit-user/edit-user.component';

@NgModule({
  declarations: [
    UsersComponent,
    DeleteUserComponent,
    CreateUserComponent,
    DetailsComponent,
    RoleComponent,
    EditUserComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    SecurityRoutingModule
  ]
})
export class SecurityModule { }
