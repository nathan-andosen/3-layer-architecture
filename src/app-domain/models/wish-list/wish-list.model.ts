import { ObservableStoreModel } from '@app-services/store';
import { Subscription } from 'rxjs/internal/Subscription';
import { IWishList } from './wish-list.interface';
import { ApiService } from '@app-domain/services/api';
import { DI } from '@thenja/di';

export class WishListModel extends ObservableStoreModel<IWishList> {
  @DI.Inject(ApiService)
  private apiSrv: ApiService;
  private stateSub: Subscription;

  /**
   * Creates an instance of WishListModel.
   *
   * @param {IWishList} [data]
   * @memberof WishListModel
   */
  constructor(data?: IWishList) {
    super(data);
    this.stateSub = this.state$.subscribe((data) => {
      // if you ever wanted to listen to state change for whatever reason
    });
  }


  /**
   * Destroy the model, unsubscribe from subscriptions
   *
   * @memberof WishListModel
   */
  destroy() {
    this.stateSub.unsubscribe();
  }


  /**
   * Fetch data from the server using the api
   *
   * @returns {Promise<void>}
   * @memberof WishListModel
   */
  async loadDataFromServer(): Promise<void> {
    const data = await this.apiSrv.wishList.fetch();
    this.store.setState(data);
    return;
  }


  /**
   * Add item to the wishlist
   *
   * @param {string} name
   * @returns {Promise<void>}
   * @memberof WishListModel
   */
  async addItem(name: string): Promise<void> {
    const preState = this.state;
    const newState = this.store.patchState({ items: [{ name: name }] });
    try { 
      await this.apiSrv.wishList.update(newState);
    } catch (err) {
      // something went wrong, we need to revert the state back
      this.store.setState(preState, 'undo');
      throw err;
    }
  }


  /**
   * Delete an item from the wishlist
   *
   * @param {string} name
   * @memberof WishListModel
   */
  deleteItem(name: string) {
    const data = this.state;
    for (let i = 0; i < data.items.length; i++) {
      if (data.items[i].name === name) {
        data.items.splice(i, 1);
        break;
      }
    }
    this.store.setState(data);
    this.apiSrv.wishList.update(this.state);
  }
}
