import {IUser} from '../../../shared/models/IUser';

export default (currentUser: IUser) => {
  const conditions: any = {};

  if (currentUser.role === 'admin') {
    return conditions;
  }

  conditions.$or = [];

  if (currentUser.role === 'student') {
    conditions.$or.push({students: currentUser._id});
  } else {
    conditions.$or.push({teachers: currentUser._id});
    conditions.$or.push({courseAdmin: currentUser._id});
  }

  return conditions;
};
