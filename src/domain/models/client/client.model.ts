import { ObservableStoreModel } from '@app-services/store';
import { IClient } from './client.interface';


export class ClientModel extends ObservableStoreModel<IClient> {


  constructor(data?: IClient) {
    super(data);
  }

}