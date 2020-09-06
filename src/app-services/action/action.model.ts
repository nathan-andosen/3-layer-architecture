type IActionDoneFn = (data?: any) => Promise<any>;
interface IActionData {
  fn: IActionDoneFn;
}

export class ActionModel {
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