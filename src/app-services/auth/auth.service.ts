import { ISignInResponse } from './auth.interfaces';
import { IUser } from '@app-domain/models/user';


/**
 * Auth service, used to handle authentication
 *
 * @export
 * @class AuthService
 */
export class AuthService {

  /**
   * Add user data to session storage
   *
   * @private
   * @param {*} userData
   * @memberof AuthService
   */
  private saveUserInSessionStorage(userData: any) {
    sessionStorage.setItem('user-session', JSON.stringify(userData));
  }

  /**
   * Get user data from session
   *
   * @returns
   * @memberof AuthService
   */
  getUserFromSession() {
    const userData = sessionStorage.getItem('user-session');
    if (userData) return JSON.parse(userData);
    return null;
  }

  /**
   * Sign out a user
   *
   * @returns {Promise<void>}
   * @memberof AuthService
   */
  signOut(): Promise<void> {
    sessionStorage.removeItem('user-session');
    return Promise.resolve();
  }


  /**
   * Sign in a user
   *
   * @param {string} username
   * @param {string} password
   * @returns {Promise<ISignInResponse>}
   * @memberof AuthService
   */
  signIn(username: string, password: string): Promise<ISignInResponse> {
    return new Promise((resolve, reject) => {
      // fake some api request to a server
      setTimeout(() => {
        if (username === 'admin' && username === password) {
          const userData: IUser = {
            id: '123',
            username: username,
            firstname: 'Admin',
            lastname: '',
            behaviour: "nice"
          };
          this.saveUserInSessionStorage(userData);
          resolve({ user: userData});
        } else {
          resolve({ error: 'Incorrect username or password' });
        }
      }, 500)
    });
  }
}
