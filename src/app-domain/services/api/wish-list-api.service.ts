import { DI } from '@thenja/di';
import { IWishList } from '@app-domain/models/wish-list';
import { AjaxRequestService } from '@app-services/ajax';



/**
 * All api requests related to wish list
 *
 * @export
 * @class WishListApiService
 */
export class WishListApiService {
  @DI.Inject(AjaxRequestService)
  private ajaxRequestSrv: AjaxRequestService;


  /**
   * Fetch the wish list
   *
   * @returns
   * @memberof WishListApiService
   */
  async fetch() {
    return this.ajaxRequestSrv.get('/wishlist/fetch');
  }


  /**
   * Update the wish list
   *
   * @param {IWishList} data
   * @returns
   * @memberof WishListApiService
   */
  async update(data: IWishList) {
    if (data.items.length > 5) {
      throw new Error('Maximum wishlist items reached');
    }
    return this.ajaxRequestSrv.patch('/wishlist/update', data);
  }
}
