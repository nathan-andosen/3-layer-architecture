import { DI } from '@thenja/di';
import { WishListApiService } from './wish-list-api.service';

/**
 * Service used to make api requests
 *
 * @export
 * @class ApiService
 */
export class ApiService {
  @DI.Inject(WishListApiService)
  wishList: WishListApiService;
}
