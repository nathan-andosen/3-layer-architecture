import { DI } from '@thenja/DI';
import { UserFactory, UserModel } from '../../models/user';

export class UserService {
  @DI.Inject(UserFactory)
  private userFactory: UserFactory;

  createUser(): UserModel {
    return this.userFactory.create();
  }
}