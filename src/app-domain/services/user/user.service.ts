import { DI } from '@thenja/di';
import { UserFactory, UserModel, IUser } from '@app-domain/models/user';
import { AuthService } from '@app-services/auth';


/**
 * User service, used to perform actions on signed in user
 *
 * @export
 * @class UserService
 */
export class UserService {
  @DI.Inject(UserFactory)
  private userFactory: UserFactory;

  @DI.Inject(AuthService)
  private authSrv: AuthService;

  private signedInUser: UserModel;

  /**
   * Create a user
   *
   * @param {IUser} [data=null]
   * @returns {UserModel}
   * @memberof UserService
   */
  createUser(data: IUser = null): UserModel {
    return this.userFactory.create(data);
  }


  /**
   * Sign in a user
   *
   * @param {string} username
   * @param {string} password
   * @returns {Promise<UserModel>}
   * @memberof UserService
   */
  async signIn(username: string, password: string): Promise<UserModel> {
    const res = await this.authSrv.signIn(username, password);
    if (res.error) return Promise.reject(new Error(res.error));
    this.signedInUser = this.userFactory.create(res.user);
    return Promise.resolve(this.signedInUser);
  }


  /**
   * Sign out a user
   *
   * @returns {Promise<void>}
   * @memberof UserService
   */
  signOut(): Promise<void> {
    this.signedInUser = null;
    return this.authSrv.signOut();
  }


  /**
   * Check if a user is currently signed in
   *
   * @returns {boolean}
   * @memberof UserService
   */
  userIsSignedIn(): boolean {
    return (this.signedInUser) ? true : false;
  }


  /**
   * Check a user has a session
   *
   * @returns {Promise<UserModel>}
   * @memberof UserService
   */
  checkUserHasSession(): Promise<UserModel> {
    const userData = this.authSrv.getUserFromSession();
    if (userData) {
      this.signedInUser = this.userFactory.create(userData);
      return Promise.resolve(this.signedInUser);
    }
    return Promise.resolve(null);
  }
}
