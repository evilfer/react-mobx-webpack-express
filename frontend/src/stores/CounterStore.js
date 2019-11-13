import {action, observable} from "mobx";


export class CounterStore {
  @observable
  count = 0;

  @observable
  user = null;

  @action
  async add() {
    this.count++;
  }
}
