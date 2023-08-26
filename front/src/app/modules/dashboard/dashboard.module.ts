import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ListCoursesComponent } from './list-courses/list-courses.component';
import { MyCoursesComponent } from './my-courses/my-courses.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ProfileComponent } from './profile/profile.component';
import { UserComponent } from './user/user.component';
import { UserEditDialogComponent } from './user/user-edit-dialog/user-edit-dialog.component';
import { UserCreateDialogComponent } from './user/user-create-dialog/user-create-dialog.component';
import { CourseComponent } from './course/course.component';
import { CourseCreateDialogComponent } from './course/course-create-dialog/course-create-dialog.component';
import { CourseEditDialogComponent } from './course/course-edit-dialog/course-edit-dialog.component';

@NgModule({
  declarations: [DashboardPageComponent, ListCoursesComponent, MyCoursesComponent, ProfileComponent, UserComponent, UserEditDialogComponent, UserCreateDialogComponent, CourseComponent, CourseCreateDialogComponent, CourseEditDialogComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatDividerModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatOptionModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    
  ],
  exports: [
    DashboardPageComponent
  ],
  providers: [],
})
export class DashboardModule {}

