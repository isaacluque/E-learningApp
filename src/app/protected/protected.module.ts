import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProtectedRoutingModule } from './protected-routing.module';
import { AuthModule } from '../auth/auth.module';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { SecurityModule } from './pages/security/security.module';
import { MaterialModule } from '../material/material.module';
import { CourseModule } from './pages/course/course.module';



@NgModule({
  declarations: [
    MainLayoutComponent
  ],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    AuthModule,
    SecurityModule,
    MaterialModule,
    CourseModule
  ]
})
export class ProtectedModule { }
