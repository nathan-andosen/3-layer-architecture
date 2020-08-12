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

  signOut() {

  }

  signIn(username: string, password: string): Promise<ISignInResponse> {
    return new Promise((resolve, reject) => {
      // fake some api request to a server
      setTimeout(() => {
        if (username === 'admin' && username === password) {
          resolve({ user: {
            id: '123',
            username: username,
            firstname: 'Admin',
            lastname: ''
          }});
        } else {
          resolve({ error: 'Incorrect username or password' });
        }
      }, 500)
    });
  }

}
