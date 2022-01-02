import { ObservableStore } from './observable-store';
import { Observable } from 'rxjs';


/**
 * Models can extend this class and will get a reactive state via observables
 *
 * @export
 * @abstract
 * @class ObservableStoreModel
 * @template T
 */
export abstract class ObservableStoreModel<T> {
  protected store: ObservableStore<T>;

  get state$(): Observable<T> {
    return this.store.state$;
  }

  get state(): T {
    return this.store.state;
  }

  constructor(data: T = null) {
    this.store = new ObservableStore(data);
  }
}
