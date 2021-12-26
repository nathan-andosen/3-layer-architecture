import { ObservableStoreModel } from '@app-services/store';
import { Subscription } from 'rxjs/internal/Subscription';
import { IWishList } from './wish-list.interface';

export class WishListModel extends ObservableStoreModel<IWishList> {
  private stateSub: Subscription;

  constructor(data?: IWishList) {
    super(data);

    this.stateSub = this.state$.subscribe((data) => {
      console.log('subscribe...', data);
      if (data) {
        window.localStorage.setItem('wish-list', JSON.stringify(this.state));
      }
    });
  }


  destroy() {
    this.stateSub.unsubscribe();
  }


  async loadFromStorage(): Promise<void> {
    let data = window.localStorage.getItem('wish-list');
    if (!data) data = '{ "title": "Christmas wish list", "items": [] }';
    this.store.setState(JSON.parse(data));
    return;
  }


  addItem(name: string) {
    this.store.patchState({
      items: [{ name: name }]
    });
  }

  deleteItem(name: string) {
    const data = this.state;
    for (let i = 0; i < data.items.length; i++) {
      if (data.items[i].name === name) {
        data.items.splice(i, 1);
        break;
      }
    }
    this.store.setState(data);
  }

}