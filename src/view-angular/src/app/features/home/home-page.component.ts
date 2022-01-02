import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '@app-domain/services/user';
import { WishListModel } from '@app-domain/models/wish-list';
import { extractErrorMessage } from '@app-services/utils';

/**
 * Home page component
 *
 * @export
 * @class HomePageComponent
 */
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  wishList: WishListModel;
  wishListItem: string = "";
  inputAddError = "";


  /**
   * Creates an instance of HomePageComponent.
   *
   * @param {Router} router
   * @param {UserService} userSrv
   * @memberof HomePageComponent
   */
  constructor(private router: Router, private userSrv: UserService) {}


  /**
   * Init the component
   *
   * @memberof HomePageComponent
   */
  ngOnInit(): void {
    this.wishList = new WishListModel();
    this.wishList.loadDataFromServer();
  }


  /**
   * Sign out
   *
   * @memberof HomePageComponent
   */
  async signout() {
    try {
      await this.userSrv.signOut();
      await this.router.navigate(['/user/signin']);
    } catch(err) {
      await this.router.navigate(['/user/signin']);
    }
  }


  /**
   * Add an item to the wishlist
   *
   * @memberof HomePageComponent
   */
  async addItem() {
    if (this.wishListItem) {
      try {
        await this.wishList.addItem(this.wishListItem);
      } catch(err: unknown) {
        this.inputAddError = extractErrorMessage(err);
      }
      this.wishListItem = '';
    }
  }


  /**
   * Delete an item from the wishlist
   *
   * @param {CustomEvent} e
   * @memberof HomePageComponent
   */
  deleteItem(e: CustomEvent) {
    this.wishList.deleteItem(e.detail.item.innerText);
  }
}
