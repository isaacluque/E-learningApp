import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProtectedRoutingModule } from './protected-routing.module';
import { AuthModule } from '../auth/auth.module';
import { MainLayoutComponent } from './pages/main-layout/main-layout.component';
import { MaterialModule } from '../material/material.module';
import { CourseModule } from './pages/course/course.module';
import { NotificationComponent } from './pages/notification/notification.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { SubLevelMenuComponent } from './pages/main-layout/components/sub-level-menu/sub-level-menu.component';
import { ToolbarComponent } from './pages/main-layout/components/toolbar/toolbar.component';
import { SidenavComponent } from './pages/main-layout/components/sidenav/sidenav.component';
import { FooterComponent } from './pages/main-layout/components/footer/footer.component';



@NgModule({
  declarations: [
    MainLayoutComponent,
    NotificationComponent,
    ShoppingCartComponent,
    SubLevelMenuComponent,
    ToolbarComponent,
    SidenavComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    AuthModule,
    MaterialModule,
    CourseModule
  ]
})
export class ProtectedModule { }
