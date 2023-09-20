import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './pages/main-layout/main-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children:[
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
      path:'administration',
      loadChildren: () => import('../protected/pages/administration/administration.module').then(m => m.AdministrationModule)
    },
    {
      path:'courses',
      loadChildren: () => import('../protected/pages/course/course.module').then(m => m.CourseModule)
    },
    {
      path:'notification',
      loadChildren: () => import('../protected/pages/notification/notification.module').then(m => m.NotificationModule)
    },
    {
      path:'shopping-cart',
      component: ShoppingCartComponent
    },
    {
      path:'**',
      redirectTo: 'courses'
    }
  ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }
