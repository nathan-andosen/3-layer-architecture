
import { Injectable } from '@angular/core';

import { UserService } from '@domain/services/user';
import { AjaxRequestService, AJAX_REQUEST_EVENTS } from '@app-services/ajax';
import { typeWithParameters } from '@angular/compiler/src/render3/util';

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
    this.ajaxRequestSrv.on(AJAX_REQUEST_EVENTS.FETCH_JWT_TOKEN, (data) => {
      return Promise.resolve({ jwtToken: '12345' });
    });

    this.ajaxRequestSrv.get('');
  }

}
