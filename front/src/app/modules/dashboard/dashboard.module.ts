import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { CoursesComponent } from './courses/courses.component'


@NgModule({
  declarations: [DashboardPageComponent, CoursesComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ],
  exports: [
    DashboardPageComponent,
    CoursesComponent
  ],
  providers: [],
})
export class DashboardModule {}
