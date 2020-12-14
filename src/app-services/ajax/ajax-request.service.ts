import { ajax } from 'rxjs/ajax';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { DI } from '@thenja/di';

import { DummyLocalStorageService } from './dummy-local-storage.service';

import {
  EventManager,
  IEvent,
  IEventCallbackFn
} from '../event-manager';

// our ajax request service events
export const AJAX_REQUEST_EVENTS = {
  FETCH_JWT_TOKEN: {
    name: 'fetch-jwt-token',
    singleSubscriber: true,
    throwErrorIfNoSubscriber: true
  } as IEvent
};


interface IFetchJwtToken {
  jwtToken: string;
}


/**
 * Service to make API requests using RxJs Ajax
 *
 * @export
 * @class AjaxRequestService
 */
export class AjaxRequestService {
  @DI.Inject(DummyLocalStorageService)
  private dummyLocalStorageSrv: DummyLocalStorageService;

  // keep the event manager private, we will add our own on() off() methods to
  // the service itself
  private events: EventManager;

  constructor() {
    this.events = new EventManager();
  }

  on(event: IEvent, fn: IEventCallbackFn) {
    this.events.on(event, fn);
  }

  off(event: IEvent, fn: IEventCallbackFn) {
    this.events.off(event, fn);
  }


  private async getHttpHeaders(): Promise<any> {
    const data: IFetchJwtToken = await this.events
    .emit(AJAX_REQUEST_EVENTS.FETCH_JWT_TOKEN);
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + data.jwtToken 
    };
    return headers;
  };


  async get(endPointUrl: string): Promise<any> {
    const headers = await this.getHttpHeaders();
    // normally we would make an ajax request to a server, for demo purposes,
    // we just use a dummy local storage service
    if (endPointUrl === '/clients/fetch') {
      return this.dummyLocalStorageSrv.getClients();
    }
    return null;
  }


  async post(endPointUrl: string, requestData?: any): Promise<any> {
    const headers = await this.getHttpHeaders();
    // normally we would make an ajax request to a server, for demo purposes,
    // we just use a dummy local storage service
    if (endPointUrl === '/client/create') {
      return this.dummyLocalStorageSrv.createClient(requestData);
    }
    return null;
  }

  put() {

  }

  patch() {

  }

  delete() {

  }

  // get() {
  //   const responseData = ajax({
  //     url: '',
  //     method: 'GET',
  //     headers: this.getHttpHeaders(),

  //     // for use in POST
  //     // body: {}
  //   })
  //   .pipe(
  //     map((response) => {
  //       return response;
  //     }),
  //     catchError((err) => {
  //       return of(err);
  //     })
  //   );
  // }

}