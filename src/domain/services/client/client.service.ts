import { DI } from '@thenja/DI';
import { ClientModel, ClientFactory, IClient} from '@domain/models/client';

export class ClientService {
  @DI.Inject(ClientFactory)
  private clientFactory: ClientFactory;
  

  createClient(): ClientModel {
    return null;
  }


  fetchAllClients(): ClientModel[] {
    return [];
  }



}