/**
 * Created by olineff on 05.06.2017.
 */
import {IUser} from '../../../shared/models/IUser';
import {IWUser} from '../../../shared/models/IWUser';

export class ObsCsvController {
  lines: string[] = [];
  whitelistUser: IWUser[] = [];

  /**
   *
   * @param file
   * @param course
   * @param allUsers
   * @returns {any}
   */
  public updateCourseFromFile(file:  any, course: any, allUsers: any[]): any {
    this.parseFileToWhitelistUser(file);
    course = this.addParsedUsersToCourse(course, allUsers);
    return this.updateWhitelistUser(course);
  }

  /**
   *
   * @param file
   * @returns {IWUser[]}
   */
  public parseFileToWhitelistUser(file: any): IWUser[] {
    this.whitelistUser = [];
    this.splitByLineBreaks(file.buffer.toString());
    console.log('File was parsed successfully. There where ' + this.whitelistUser.length + ' whitelistUser parsed.');
    return this.whitelistUser;
  }

  /**
   *
   * @param buffer
   */
  private splitByLineBreaks(buffer: string) {
    this.lines = buffer.split(/\r?\n|\r/);
    const userLines = this.lines.filter(e => e.split(';').length >= 3);
    userLines.forEach(e =>
      this.whitelistUser.push({
        _id: null,
        firstName: e.split(';')[0],
        lastName: e.split(';')[1],
        uid: Number(e.split(';')[2]).toString()
      }));
  }

  /**
   *
   * @param course
   * @param allUsers
   * @returns {any}
   */
  public addParsedUsersToCourse(course: any, allUsers: IUser[]): any {
    this.whitelistUser.forEach(wUser => {
      const foundUsers: IUser[] =
        allUsers.filter(user =>
        wUser.firstName === user.profile.firstName
        && wUser.lastName === user.profile.lastName
        && wUser.uid === user.uid);
      foundUsers.forEach(e => course.students.push(e));
    });
    return course;
  }

  /**
   *
   * @param course
   * @returns {any}
   */
  public updateWhitelistUser(course: any): any {
    course.whitelist = this.whitelistUser;
    return course;
  }

}
