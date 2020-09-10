
import { Injectable } from '@angular/core';

import { UserService } from '@domain/services/user';
import { AjaxRequestService } from '@app-services/ajax';

export function init_app(appLoadService: AppInitialisationService) {
  return () => appLoadService.initializeApp();
}

@Injectable()
export class AppInitialisationService {

  constructor(private userSrv: UserService,
  private ajaxRequestSrv: AjaxRequestService) {}

  initializeApp(): Promise<any> {
    console.log('initializeApp()...');
    this.subscribeToServiceTasks();
    return this.userSrv.checkUserHasSession()
    .then((user) => {
      return Promise.resolve();
    })
    .catch((err) => {
      console.log(err);
      return Promise.resolve();
    });
  }


  private subscribeToServiceTasks() {
    this.ajaxRequestSrv.onFetchJwtToken(() => {
      return Promise.resolve({ jwtToken: '12345' });
    });
  }

}
