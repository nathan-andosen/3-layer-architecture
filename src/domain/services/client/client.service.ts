import { DI } from '@thenja/DI';
import { ClientModel, ClientFactory, IClient} from '@domain/models/client';
import { ApiService } from '../api';

export class ClientService {
  @DI.Inject(ClientFactory)
  private clientFactory: ClientFactory;

  @DI.Inject(ApiService)
  private apiSrv: ApiService;

  createClient(data: Partial<IClient>): Promise<ClientModel> {
    return this.apiSrv.client.create(data)
    .then((clientData) => {
      return Promise.resolve(this.clientFactory.create(clientData));
    })
    .catch((err) => {
      return Promise.reject(err);
    });
  }


  fetchAllClients(): ClientModel[] {
    return [];
  }



}