import { ClientModel } from './client.model';
import { IClient } from './client.interface';

export class ClientFactory {
  create(data: IClient = null): ClientModel {
    return new ClientModel(data);
  }
}
