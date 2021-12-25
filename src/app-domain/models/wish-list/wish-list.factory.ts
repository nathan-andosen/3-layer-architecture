import { WishListModel } from './wish-list.model';
import { IWishList } from './wish-list.interface';

export class WishListFactory {
  create(data: IWishList = null): WishListModel {
    return new WishListModel(data);
  }
}