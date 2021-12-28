import { WishListModel } from './wish-list.model';
import { IWishList } from './wish-list.interface';

/**
 * Fectory to create WishList models
 *
 * @export
 * @class WishListFactory
 */
export class WishListFactory {
  create(data: IWishList = null): WishListModel {
    return new WishListModel(data);
  }
}