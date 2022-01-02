import { ObservableStoreModel } from '@app-services/store';
import { IUser } from './user.interface';


/**
 * User model
 *
 * @export
 * @class UserModel
 * @extends {ObservableStoreModel<IUser>}
 */
export class UserModel extends ObservableStoreModel<IUser> {

  /**
   * Update user data
   *
   * @param {Partial<IUser>} data
   * @memberof UserModel
   */
  updateData(data: Partial<IUser>) {
    this.store.patchState(data);
  }

  
  /**
   * Update username
   *
   * @param {string} name
   * @memberof UserModel
   */
  updateUsername(name: string) {
    this.updateData({ username: name });
  }
}
