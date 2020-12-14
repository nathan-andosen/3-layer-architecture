import { DI } from '@thenja/di';

import { ClientApiService } from './client-api.service';

export class ApiService {
  @DI.Inject(ClientApiService)
  client: ClientApiService;
}
