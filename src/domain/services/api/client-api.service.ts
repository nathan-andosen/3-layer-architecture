import { DI } from '@thenja/DI';

import { AjaxRequestService } from '@app-services/ajax';
import { IClient} from '../../models/client';



export class ClientApiService {
  @DI.Inject(AjaxRequestService)
  private ajaxRequestSrv: AjaxRequestService;

  async create(data: Partial<IClient>): Promise<IClient> {
    const clientData: IClient = await this.ajaxRequestSrv
    .post('/client/create', data);
    return clientData;
  }

  async fetchAll(): Promise<IClient[]> {
    const clients: IClient[] = await this.ajaxRequestSrv.get('/clients/fetch');
    return clients;
  }

}
