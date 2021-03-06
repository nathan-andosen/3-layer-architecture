import { ISignInResponse } from './auth.interfaces';

export class AuthService {

  private saveInSessionStorage(userData: any) {
    sessionStorage.setItem('user-session', JSON.stringify(userData));
  }

  getUserFromSession() {
    const userData = sessionStorage.getItem('user-session');
    if (userData) return JSON.parse(userData);
    return null;
  }

  signOut(): Promise<void> {
    sessionStorage.removeItem('user-session');
    return Promise.resolve();
  }

  signIn(username: string, password: string): Promise<ISignInResponse> {
    return new Promise((resolve, reject) => {
      // fake some api request to a server
      setTimeout(() => {
        if (username === 'admin' && username === password) {
          const userData = {
            id: '123',
            username: username,
            firstname: 'Admin',
            lastname: ''
          };
          this.saveInSessionStorage(userData);
          resolve({ user: userData});
        } else {
          resolve({ error: 'Incorrect username or password' });
        }
      }, 500)
    });
  }

}
