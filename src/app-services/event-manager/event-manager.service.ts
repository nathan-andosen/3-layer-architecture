import { isString } from '../utils';

export type IEventCallbackFn = (data?: any) => Promise<any>;
interface IEventOperation {
  fn: IEventCallbackFn;
  scope?: any;
  once?: boolean;
}

export interface IEvent {
  name: string;
  singleSubscriber?: boolean;
  throwErrorIfNoSubscriber?: boolean|string;
}


/**
 * Manage events with emit, on and off methods.
 *
 * @export
 * @class EventManager
 */
export class EventManager {
  // subscribed events
  private _events: { [eventName: string]: IEventOperation[] };
  private set events(val: { [eventName: string]: IEventOperation[] }) {
    this._events = val;
  }
  private get events(): { [eventName: string]: IEventOperation[] } {
    return (this._events || (this._events = {}));
  }


  /**
   * Get no subscriber error message from an event
   *
   * @private
   * @param {IEvent} event
   * @returns {string}
   * @memberof EventManager
   */
  private getNoSubscriberErrorMsg(event: IEvent): string {
    return (isString(event.throwErrorIfNoSubscriber))
      ? (event.throwErrorIfNoSubscriber as string)
      : 'No subscriber for event: ' + event.name;
  }


  /**
   * Emit an event
   *
   * @param {IEvent} event
   * @param {*} [data]
   * @returns {void}
   * @memberof EventManager
   */
  async emit(event: IEvent, data?: any): Promise<any> {
    if ((!this.events[event.name] || this.events[event.name].length < 1)
    && event.throwErrorIfNoSubscriber) {
      return Promise.reject(this.getNoSubscriberErrorMsg(event));
    }
    if (!this.events[event.name]) return null;
    const promisesToResolve: Promise<any>[] = [];
    for (const eventOperation of this.events[event.name]) {
      promisesToResolve
      .push(eventOperation.fn.call(eventOperation.scope, data));
      if (eventOperation.once) this.off(event, eventOperation.fn);
    }
    if (event.singleSubscriber) {
      const responses = await Promise.all(promisesToResolve);
      return responses[0];
    }
    return Promise.all(promisesToResolve);
  }


  /**
   * Listen to an event
   *
   * @param {IEvent} event
   * @param {(data?: any, next?: INextFn) => void} fn
   * @param {*} [scope]
   * @memberof EventManager
   */
  on(event: IEvent, fn: IEventCallbackFn, scope?: any) {
    this.addFn(event, fn, scope);
  }


  /**
   * Listen to an event once
   *
   * @param {IEvent} event
   * @param {(data?: any, next?: INextFn) => void} fn
   * @param {*} [scope]
   * @memberof EventManager
   */
  once(event: IEvent, fn: IEventCallbackFn, scope?: any) {
    this.addFn(event, fn, scope, true);
  }


  /**
   * Add a function callback for an event
   *
   * @private
   * @param {IEvent} event
   * @param {IEventCallbackFn} fn
   * @param {*} [scope]
   * @param {boolean} [once=false]
   * @memberof EventManager
   */
  private addFn(event: IEvent, fn: IEventCallbackFn, scope?: any, once = false) {
    if (!event) throw new Error('event parameter not set');
    if (!fn) throw new Error('done function not set');
    (this.events[event.name] || (this.events[event.name] = [])).push({
      fn: fn,
      scope: scope,
      once: once
    });
  }


  /**
   * Unbind from an event
   *
   * @param {IEvent} event
   * @param {IEventCallbackFn} fn
   * @returns
   * @memberof EventManager
   */
  off(event: IEvent, fn: IEventCallbackFn) {
    if (!fn || !this.events[event.name]) return;
    for (let i = 0 ; i < this.events[event.name].length; i++) {
      if (this.events[event.name][i].fn === fn) {
        this.events[event.name].splice(i, 1); break;
      }
    }
  }


  /**
   * Unbind from all events.
   *
   * @param {IEvent} [event] If set, only these events will be unsubscribed.
   * @returns
   * @memberof EventManager
   */
  offAll(event?: IEvent) {
    if (event) return delete this.events[event.name];
    this.events = {};
  }
}