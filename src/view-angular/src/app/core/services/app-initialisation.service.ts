
import { Injectable } from '@angular/core';

import { UserService } from '@app-domain/services/user';
import { typeWithParameters } from '@angular/compiler/src/render3/util';

export function init_app(appLoadService: AppInitialisationService) {
  return () => appLoadService.initializeApp();
}

@Injectable()
export class AppInitialisationService {

  constructor(private userSrv: UserService) {}

  initializeApp(): Promise<any> {
    console.log('initializeApp()...');
    return this.userSrv.checkUserHasSession()
    .then((user) => {
      return Promise.resolve();
    })
    .catch((err) => {
      console.log(err);
      return Promise.resolve();
    });
  }
}
