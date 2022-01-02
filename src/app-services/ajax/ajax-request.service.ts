import { ajax } from 'rxjs/ajax';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { wait } from '../utils';



/**
 * Service to make API requests to servers using RxJs Ajax
 *
 * @export
 * @class AjaxRequestService
 */
export class AjaxRequestService {

  private async getHttpHeaders(): Promise<any> {
    const headers = {
      'Content-Type': 'application/json'
    };
    return headers;
  };


  async get(endPointUrl: string): Promise<any> {
    const headers = await this.getHttpHeaders();
    // normally we would make an ajax request to a server, for demo purposes,
    // we just use local storage
    if (endPointUrl === '/wishlist/fetch') {
      await wait(500);
      let data = window.localStorage.getItem('wish-list');
      if (!data) {
        data = '{ "title": "Christmas wish list", "items": [] }';
        window.localStorage.setItem('wish-list', data);
      }
      return JSON.parse(data);
    }
    return null;
  }


  async post(endPointUrl: string, postData?: any): Promise<any> {
    const headers = await this.getHttpHeaders();
    return null;
  }

  put() {

  }

  async patch(endPointUrl: string, patchData?: any): Promise<any> {
    const headers = await this.getHttpHeaders();
    // normally we would make an ajax request to a server, for demo purposes,
    // we just use local storage
    if (endPointUrl === '/wishlist/update') {
      await wait(500);
      if (patchData) {
        window.localStorage.setItem('wish-list', JSON.stringify(patchData));
      }
      return null;
    }
    return null;
  }

  delete() {

  }


  async realGet() {

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