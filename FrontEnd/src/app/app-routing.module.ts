import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseComponent } from './course/course.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { RegistrationComponent } from './registration/registration.component';


const routes: Routes = [
  {path : 'courses' ,  component: CourseComponent},
  {path : 'course' ,   component: CourseDetailsComponent},
  {path : 'courseregstrn' ,   component: RegistrationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
