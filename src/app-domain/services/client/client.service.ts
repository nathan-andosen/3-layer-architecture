import { DI } from '@thenja/di';
import { ClientModel, ClientFactory, IClient} from '@app-domain/models/client';
import { ApiService } from '../api';

export class ClientService {
  @DI.Inject(ClientFactory)
  private clientFactory: ClientFactory;

  @DI.Inject(ApiService)
  private apiSrv: ApiService;

  async createClient(data: Partial<IClient>): Promise<ClientModel> {
    const clientData = await this.apiSrv.client.create(data);
    return this.clientFactory.create(clientData);
  }


  async fetchAllClients(): Promise<ClientModel[]> {
    const clientsData = await this.apiSrv.client.fetchAll();
    const clients: ClientModel[] = [];
    clientsData.forEach((clientData) => {
      clients.push(this.clientFactory.create(clientData));
    });
    return clients;
  }



}