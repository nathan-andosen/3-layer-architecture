import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

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
  wishListItemForm: FormGroup;
  wishList: WishListModel;

  constructor(private router: Router,
  private userSrv: UserService,
  private formBuilder: FormBuilder) {
    this.buildWishListForm();
  }

  ngOnInit(): void {
    this.wishList = new WishListModel();
    this.wishList.loadFromStorage();
  }


  private buildWishListForm() {
    this.wishListItemForm = this.formBuilder.group({
      wishListItem: ['', Validators.required]
    });
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



  addWishListItemOnSubmit() {
    const itemName = this.wishListItemForm.controls.wishListItem.value;
    console.log(itemName);
    if (itemName) {
      this.wishList.addItem(itemName);
    }
  }

}
