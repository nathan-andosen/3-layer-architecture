import { UserModel } from './user.model';
import { IUser } from './user.interface';

export class UserFactory {
  create(data: IUser = null): UserModel {
    return new UserModel(data);
  }
}
