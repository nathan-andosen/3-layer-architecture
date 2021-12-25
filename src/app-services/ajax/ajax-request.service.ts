import { ajax } from 'rxjs/ajax';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { DI } from '@thenja/di';

import { DummyLocalStorageService } from './dummy-local-storage.service';



/**
 * Service to make API requests to servers using RxJs Ajax
 *
 * @export
 * @class AjaxRequestService
 */
export class AjaxRequestService {
  @DI.Inject(DummyLocalStorageService)
  private dummyLocalStorageSrv: DummyLocalStorageService;

  private async getHttpHeaders(): Promise<any> {
    const headers = {
      'Content-Type': 'application/json'
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