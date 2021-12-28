import { DI } from '@thenja/di';
import { IWishList } from '@app-domain/models/wish-list';
import { AjaxRequestService } from '@app-services/ajax';



export class WishListApiService {
  @DI.Inject(AjaxRequestService)
  private ajaxRequestSrv: AjaxRequestService;


  async fetch() {
    return this.ajaxRequestSrv.get('/wishlist/fetch');
  }

  async update(data: IWishList) {
    if (data.items.length > 5) {
      throw new Error('Maximum wishlist items reached');
    }
    return this.ajaxRequestSrv.patch('/wishlist/update', data);
  }

}