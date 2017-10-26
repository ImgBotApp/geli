import {
  Body, Get, Post, Put, Delete, Param, JsonController, UseBefore, Authorized,
  CurrentUser, NotFoundError, OnUndefined
} from 'routing-controllers';
import passportJwtMiddleware from '../security/passportJwtMiddleware';

import {Lecture} from '../models/Lecture';
import {ILecture} from '../../../shared/models/ILecture';
import {Course} from '../models/Course';
import {IUser} from '../../../shared/models/IUser';
import courseUserReadConditions from '../common/courseUserReadConditions';

@JsonController('/lecture')
@UseBefore(passportJwtMiddleware)
export class LectureController {

  @Get('/:id')
  getLecture(@Param('id') id: string, @CurrentUser() currentUser: IUser) {
    this.getLectureAndCourseForUser(id, currentUser)
      .then(({lecture}) => lecture.toObject());
  }

  @Authorized(['teacher', 'admin'])
  @Post('/')
  addLecture(@Body() data: any, @CurrentUser() currentUser: IUser) {
    const lectureData: ILecture = data.lecture;

    return Course.findOne({
      ...courseUserReadConditions(currentUser),
      _id: data.courseId,
    })
      .then(course => {
        if (!course) {
          throw new NotFoundError();
        }

        return new Lecture(lectureData).save()
          .then(lecture => ({lecture, course}));
      })
      .then(({course, lecture}) => {
        course.lectures.push(lecture);

        return course.save()
          .then(() => lecture.toObject());
      });
  }

  @Authorized(['teacher', 'admin'])
  @Put('/:id')
  updateLecture(@Param('id') id: string, @Body() lectureData: ILecture, @CurrentUser() currentUser: IUser) {
    return this.getLectureAndCourseForUser(id, currentUser)
      .then(({lecture}) => {
        if (!lecture) {
          throw new NotFoundError();
        }

        lecture.set(lectureData);
        lecture.validate();

        return lecture.save();
      })
      .then(lecture => lecture.toObject());
  }

  @Authorized(['teacher', 'admin'])
  @Delete('/:id')
  @OnUndefined(204)
  deleteLecture(@Param('id') id: string, @CurrentUser() currentUser: IUser) {
    this.getLectureAndCourseForUser(id, currentUser)
      .then(({course, lecture}) => {
        return course.update({$pull: {lectures: id}}).then(() => lecture);
      })
      .then(lecture => lecture.remove());
  }

  private getLectureAndCourseForUser(id: string, currentUser: IUser) {
    return Course.findOne({
      ...courseUserReadConditions(currentUser),
      lectures: id,
    })
      .then(course => {
        if (!course) {
          throw new NotFoundError();
        }

        return Lecture.findById(id).then(lecture => ({lecture, course}));
      });
  }
}
