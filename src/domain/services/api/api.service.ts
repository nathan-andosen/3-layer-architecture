import { DI } from '@thenja/DI';

import { ClientApiService } from './client-api.service';

export class ApiService {
  @DI.Inject(ClientApiService)
  client: ClientApiService;
}
