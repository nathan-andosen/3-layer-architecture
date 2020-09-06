
import { Injectable } from '@angular/core';

import { UserService } from '@domain/services/user';
import { AjaxRequestService, AJAX_REQUEST_ACTIONS } from '@app-services/ajax';

export function init_app(appLoadService: AppInitialisationService) {
  return () => appLoadService.initializeApp();
}

@Injectable()
export class AppInitialisationService {

  constructor(private userSrv: UserService,
  private ajaxRequestSrv: AjaxRequestService) {}

  initializeApp(): Promise<any> {
    console.log('initializeApp()...');
    this.listenToAjaxHooks();
    return this.userSrv.checkUserHasSession()
    .then((user) => {
      return Promise.resolve();
    })
    .catch((err) => {
      console.log(err);
      return Promise.resolve();
    });
  }


  private listenToAjaxHooks() {
    this.ajaxRequestSrv.action.on(AJAX_REQUEST_ACTIONS.GET_JWT_TOKEN, () => {
      return Promise.resolve('12345');
    });

    this.ajaxRequestSrv.get();
  }

}
