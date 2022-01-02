
import { Injectable } from '@angular/core';

import { UserService } from '@app-domain/services/user';
import { typeWithParameters } from '@angular/compiler/src/render3/util';

export function init_app(appLoadService: AppInitialisationService) {
  return () => appLoadService.initializeApp();
}

@Injectable()
export class AppInitialisationService {

  constructor(private userSrv: UserService) {}

  /**
   * Gets fired before the app initializes
   *
   * @returns {Promise<any>}
   * @memberof AppInitialisationService
   */
  async initializeApp(): Promise<any> {
    // do stuff before the app initializes
    return this.userSrv.checkUserHasSession();
  }
}
