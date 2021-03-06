import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LectureFormComponent} from './lecture-form/lecture-form.component';
import {LectureComponent} from './lecture.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '@angular/material';
import {UnitModule} from '../unit/unit.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    UnitModule
  ],
  declarations: [
    LectureComponent,
    LectureFormComponent,
  ],
  exports: [
    LectureComponent,
    LectureFormComponent,
  ]
})
export class LectureModule {
}
