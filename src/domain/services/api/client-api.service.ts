import { DI } from '@thenja/DI';

import { AjaxRequestService } from '@app-services/ajax';
import { IClient} from '../../models/client';



export class ClientApiService {
  @DI.Inject(AjaxRequestService)
  private ajaxRequestSrv: AjaxRequestService;

  create(data: Partial<IClient>): Promise<IClient> {
    return this.ajaxRequestSrv.post('/client/create', data)
    .then((responseData: IClient) => {
      return Promise.resolve(responseData);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
  }

}
