import { ObservableStoreModel } from '@app-services/store';
import { IClient } from './client.interface';


export class ClientModel extends ObservableStoreModel<IClient> {

  private data: IClient;

  constructor(data?: IClient) {
    super();
    this.data = data;
  }

}