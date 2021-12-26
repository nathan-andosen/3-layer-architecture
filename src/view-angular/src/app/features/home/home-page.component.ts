import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup, NgForm } from '@angular/forms';

import { UserService } from '@app-domain/services/user';
import { WishListModel } from '@app-domain/models/wish-list';

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

  constructor(private router: Router,
  private userSrv: UserService) {
  }

  ngOnInit(): void {
    this.wishList = new WishListModel();
    this.wishList.loadFromStorage();
  }


  signout() {
    this.userSrv.signOut()
    .then(() => {
      this.router.navigate(['/user/signin']);
    })
    .catch((err) => {
      console.log(err);
      this.router.navigate(['/user/signin']);
    });
  }


  addItem() {
    if (this.wishListItem) {
      this.wishList.addItem(this.wishListItem);
      this.wishListItem = '';
    }
  }

  deleteItem(e: CustomEvent) {
    this.wishList.deleteItem(e.detail.item.innerText);
  }

}
