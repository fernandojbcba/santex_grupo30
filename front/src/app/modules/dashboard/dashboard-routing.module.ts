import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { ListCoursesComponent } from './list-courses/list-courses.component';
import { MyCoursesComponent } from './my-courses/my-courses.component';
import { ProfileComponent } from './profile/profile.component';
import { UserComponent } from './user/user.component';
import { CourseComponent } from './course/course.component';
import { TeacherComponent } from './teacher/teacher.component';
import { StudentsCourseComponent } from './students-course/students-course.component';
const routes: Routes = [
  {
    path: '',
    component: DashboardPageComponent,
    children: [
      { path: '', redirectTo: 'courses_list', pathMatch: 'full' },
      { path: 'courses_list', component: ListCoursesComponent },
      { path: 'my_courses', component: MyCoursesComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'useredit', component: UserComponent },
      {path: 'courseedit', component:CourseComponent },
      {path: 'teacher', component:TeacherComponent},
      {path: 'students/:courseId', component: StudentsCourseComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }