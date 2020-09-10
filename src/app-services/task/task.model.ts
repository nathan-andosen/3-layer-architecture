import { isString } from '../utils';
import { takeLast } from 'rxjs/operators';

type ITaskDoneFn = (data?: any) => Promise<any>;
interface ITaskOperation {
  fn: ITaskDoneFn;
}

export interface ITask {
  name: string;
  singleSubscriber?: boolean;
  throwErrorIfNoSubscriber?: boolean|string;
}


export class TaskModel {
  private tasks: { [taskName: string]: ITaskOperation[] };

  constructor() {
    this.tasks = {};
  }

  on(task: ITask, done: ITaskDoneFn) {
    if (!task) throw new Error('task parameter not set');
    if (!done) throw new Error('done parameter not set');
    if (this.tasks[task.name] && task.singleSubscriber) {
      throw new Error('Task only allows single subscriber, a subscription '
      + 'already exists for the task ' + task.name);
    }
    (this.tasks[task.name] || (this.tasks[task.name] = [])).push({
      fn: done
    });
  }


  off(task: ITask, done: ITaskDoneFn) {
    if (!done || !this.tasks[task.name]) return;
    for (let i = 0; i < this.tasks[task.name].length; i++) {
      if (this.tasks[task.name][i].fn === done) {
        this.tasks[task.name].splice(i, 1); break;
      }
    }
  }

  trigger(task: ITask, data?: any): Promise<any> {
    if (!this.tasks[task.name] || this.tasks[task.name].length < 1) {
      if (task.throwErrorIfNoSubscriber) {
        const errorMsg = (isString(task.throwErrorIfNoSubscriber))
        ? (task.throwErrorIfNoSubscriber as string)
        : 'No subscriber for task: ' + task.name;
        return Promise.reject(new Error(errorMsg));
      }
      return Promise.resolve(null);
    }
    return this.tasks[task.name][0].fn.call(this, data);
  }
}
