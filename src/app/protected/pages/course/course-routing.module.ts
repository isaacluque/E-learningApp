import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseModule } from './course.module';
import { NewCourseComponent } from './components/new-course/new-course.component';
import { EditCourseComponent } from './components/edit-course/edit-course.component';
import { DeleteCourseComponent } from './components/delete-course/delete-course.component';
import { CourseComponent } from './course.component';

const routes: Routes = [
  {
    path:'',
    component: CourseComponent,
    children:[
      {
        path:'new-course',
        component: NewCourseComponent
      },
      {
        path:'edit-course/:id_course',
        component: EditCourseComponent
      },
      {
        path:'delete-course/:id_course',
        component: DeleteCourseComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule { }
