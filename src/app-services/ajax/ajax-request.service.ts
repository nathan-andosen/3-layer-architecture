import { ajax } from 'rxjs/ajax';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { TaskModel, ITask } from '../task';


// out ajax request tasks
const AJAX_REQUEST_TASKS = {
  FETCH_JWT_TOKEN: {
    name: 'fetch-jwt-token',
    singleSubscriber: true,
    throwErrorIfNoSubscriber: 'No subscriber for AjaxRequestService.'
      + 'onFetchJwtToken()'
  } as ITask
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
  private task: TaskModel;

  constructor() {
    this.task = new TaskModel();
  }

  onFetchJwtToken(done: () => Promise<IFetchJwtToken>) {
    this.task.on(AJAX_REQUEST_TASKS.FETCH_JWT_TOKEN, done);
  }


  private getHttpHeaders(): Promise<any> {
    return this.task.trigger(AJAX_REQUEST_TASKS.FETCH_JWT_TOKEN)
    .then((data: IFetchJwtToken) => {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + data.jwtToken 
      };
      return Promise.resolve(headers);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
  };


  getFake() {
    this.getHttpHeaders()
    .then((headers) => {
      console.log(headers);
    })
    .catch((err) => {
      throw err;
    });
  }



  get() {
    const responseData = ajax({
      url: '',
      method: 'GET',
      headers: this.getHttpHeaders(),

      // for use in POST
      // body: {}
    })
    .pipe(
      map((response) => {
        return response;
      }),
      catchError((err) => {
        return of(err);
      })
    );
  }

  post() {

  }

  put() {

  }

  patch() {

  }

  delete() {

  }

}