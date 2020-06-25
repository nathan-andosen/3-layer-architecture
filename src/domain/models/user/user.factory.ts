import { UserModel } from './user.model';

export class UserFactory {
  create(): UserModel {
    return new UserModel();
  }
}
