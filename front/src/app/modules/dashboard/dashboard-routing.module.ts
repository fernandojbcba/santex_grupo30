import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { ListCoursesComponent } from './list-courses/list-courses.component';
import { MyCoursesComponent } from './my-courses/my-courses.component';
import { ProfileComponent } from './profile/profile.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserEditComponent } from './user-edit/user-edit.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardPageComponent,
    children: [
      { path: '', redirectTo: 'courses_list', pathMatch: 'full' },
      { path: 'courses_list', component: ListCoursesComponent },
      { path: 'my_courses', component: MyCoursesComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'usercreate', component: UserCreateComponent },
      { path: 'useredit', component: UserEditComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }