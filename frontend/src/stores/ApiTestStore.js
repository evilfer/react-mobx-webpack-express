import {action, observable, runInAction} from "mobx";
import axios from "axios";


export class ApiTestStore {

  @observable
  message = null;

  @action
  async loadMessage() {
    const response = await axios.get(`/api/message`);
    runInAction(() => this.message = response.data.message);
  }
}
