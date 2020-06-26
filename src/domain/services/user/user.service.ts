import { DI } from '@thenja/DI';
import { UserFactory, UserModel, IUser } from '@domain/models/user';

export class UserService {
  @DI.Inject(UserFactory)
  private userFactory: UserFactory;

  createUser(data: IUser = null): UserModel {
    return this.userFactory.create(data);
  }
}