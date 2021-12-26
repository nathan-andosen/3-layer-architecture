import { DI } from '@thenja/di';

import { WishListApiService } from './wish-list-api.service';

export class ApiService {
  @DI.Inject(WishListApiService)
  wishList: WishListApiService;
}
