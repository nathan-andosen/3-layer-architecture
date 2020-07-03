import { ObservableStoreModel } from '@app-services/store';
import { IUser } from './user.interface';
import { Observable } from 'rxjs';


export class UserModel extends ObservableStoreModel<IUser> {


  updateData(data: Partial<IUser>) {
    this.store.patchState(data);
  }

  updateUsername(name: string) {
    this.updateData({ username: name });
  }
}
