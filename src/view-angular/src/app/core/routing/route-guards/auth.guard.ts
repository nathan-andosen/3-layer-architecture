import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';

import { UserService } from '@app-domain/services/user';


/**
 * Guard to check if the user is authenticated
 *
 * @export
 * @class AuthGuard
 * @implements {CanActivate}
 */
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private userSrv: UserService, private router: Router) {}

  /**
   * Check if the route can be activated
   *
   * @param {ActivatedRouteSnapshot} next
   * @param {RouterStateSnapshot} state
   * @returns {boolean}
   * @memberof AuthGuard
   */
  canActivate(next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): boolean {
    return this.checkLogin();
  }


  /**
   * Check the user is logged in
   *
   * @returns {boolean}
   * @memberof AuthGuard
   */
  checkLogin(): boolean {
    if (this.userSrv.userIsSignedIn()) { return true; }

    // Navigate to the sign in page
    this.router.navigate(['/user/signin']);
    return false;
  }
}
