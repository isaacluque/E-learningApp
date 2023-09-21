import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProtectedRoutingModule } from './protected-routing.module';
import { AuthModule } from '../auth/auth.module';
import { MainLayoutComponent } from './pages/main-layout/main-layout.component';
import { SecurityModule } from './pages/security/security.module';
import { MaterialModule } from '../material/material.module';
import { CourseModule } from './pages/course/course.module';
import { NotificationComponent } from './pages/notification/notification.component';



@NgModule({
  declarations: [
    MainLayoutComponent,
    NotificationComponent
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
