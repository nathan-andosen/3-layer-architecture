import { ajax } from 'rxjs/ajax';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';


export const AJAX_REQUEST_ACTIONS = {
  GET_JWT_TOKEN: 'get-jwt-token'
};


type IActionDoneFn = (data?: any) => Promise<any>;
interface IActionData {
  fn: IActionDoneFn;
}

class Action {
  private actions: { [actionName: string]: IActionData[] };


  constructor() {
    this.actions = {};
  }

  on(actionName: string, done: IActionDoneFn) {
    if (!actionName) throw new Error('actionType parameter not set');
    if (!done) throw new Error('done parameter not set');
    (this.actions[actionName] || (this.actions[actionName] = [])).push({
      fn: done
    });
  }

  off(actionType: string) {

  }

  trigger() {

  }

  triggerSingle(actionName: string, data?: any): Promise<any> {
    if (!this.actions[actionName] || this.actions[actionName].length < 1) {
      return Promise.resolve(null);
    }
    const actionFn = this.actions[actionName][0].fn;
    return actionFn.call(this, data);
  }
}


export class AjaxRequestService {
  action: Action;

  constructor() {
    this.action = new Action();
  }


  private getHttpHeaders(): Promise<any> {
    return this.action.triggerSingle(AJAX_REQUEST_ACTIONS.GET_JWT_TOKEN)
    .then((jwtToken) => {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + jwtToken
      };
      return Promise.resolve(headers);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
  };



  get() {
    this.getHttpHeaders()
    .then((headers) => {
      console.log(headers);
    })
    .catch((err) => {
      throw err;
    });

    // const responseData = ajax({
    //   url: '',
    //   method: 'GET',
    //   headers: this.getHttpHeaders(),


    //   // for use in POST
    //   // body: {}
    // })
    // .pipe(
    //   map((response) => {
    //     return response;
    //   }),
    //   catchError((err) => {
    //     return of(err);
    //   })
    // );
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