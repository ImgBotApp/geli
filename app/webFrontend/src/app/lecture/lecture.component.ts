import {Component, OnInit, Input} from '@angular/core';
import {UserService} from '../shared/services/user.service';
import {ICourse} from '../../../../../shared/models/ICourse';
import {ILecture} from '../../../../../shared/models/ILecture';

@Component({
  selector: 'app-lecture',
  templateUrl: './lecture.component.html',
  styleUrls: ['./lecture.component.scss']
})
export class LectureComponent implements OnInit {

  @Input() course: ICourse;
  @Input() lecture: ILecture;

  constructor(public userService: UserService) {
  }

  ngOnInit() {
  }
}
