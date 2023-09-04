import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import { DeleteCourseComponent } from './components/delete-course/delete-course.component';
import { EditCourseComponent } from './components/edit-course/edit-course.component';
import { NewCourseComponent } from './components/new-course/new-course.component';
import { CourseComponent } from './course.component';
import { CardCoursesComponent } from './components/card-courses/card-courses.component';



@NgModule({
  declarations: [
    DeleteCourseComponent,
    EditCourseComponent,
    NewCourseComponent,
    CourseComponent,
    CardCoursesComponent
  ],
  imports: [
    CommonModule,
    CourseRoutingModule
  ]
})
export class CourseModule { }
