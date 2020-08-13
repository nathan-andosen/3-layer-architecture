import { DI } from '@thenja/DI';
import { UserFactory, UserModel, IUser } from '@domain/models/user';
import { AuthService } from '@app-services/auth';

export class UserService {
  @DI.Inject(UserFactory)
  private userFactory: UserFactory;

  @DI.Inject(AuthService)
  private authSrv: AuthService;

  private signedInUser: UserModel;

  createUser(data: IUser = null): UserModel {
    return this.userFactory.create(data);
  }


  async signIn(username: string, password: string): Promise<UserModel> {
    const res = await this.authSrv.signIn(username, password);
    if (res.error) return Promise.reject(new Error(res.error));
    this.signedInUser = this.userFactory.create(res.user);
    return Promise.resolve(this.signedInUser);
  }

  signOut(): Promise<void> {
    this.signedInUser = null;
    return this.authSrv.signOut();
  }


  userIsSignedIn(): boolean {
    return (this.signedInUser) ? true : false;
  }


  checkUserHasSession(): Promise<UserModel> {
    const userData = this.authSrv.getUserFromSession();
    if (userData) {
      this.signedInUser = this.userFactory.create(userData);
      return Promise.resolve(this.signedInUser);
    }
    return Promise.resolve(null);
  }
}
