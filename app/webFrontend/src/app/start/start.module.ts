import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StartComponent} from './start.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HomescreenComponent} from './homescreen/homescreen.component';
import {DashboardStudentComponent} from './dashboard/dashboard-student/dashboard-student.component';
import {DashboardTeacherComponent} from './dashboard/dashboard-teacher/dashboard-teacher.component';
import {DashboardAdminComponent} from './dashboard/dashboard-admin/dashboard-admin.component';
import {MaterialModule} from '@angular/material';
import {RouterModule} from '@angular/router';
import {CourseModule} from '../course/course.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    CourseModule,
  ],
  declarations: [
    StartComponent,
    DashboardComponent,
    HomescreenComponent,
    DashboardStudentComponent,
    DashboardTeacherComponent,
    DashboardAdminComponent,
  ],
  exports: [
    StartComponent,
    DashboardComponent,
    HomescreenComponent,
    DashboardStudentComponent,
    DashboardTeacherComponent,
    DashboardAdminComponent,
  ]
})
export class StartModule {
}
