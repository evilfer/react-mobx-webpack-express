import {RouterStore} from "mobx-react-router";
import {CounterStore} from "./CounterStore";
import {ApiTestStore} from "./ApiTestStore";

export const stores = {
  router: new RouterStore(),
  counter: new CounterStore(),
  apiTest: new ApiTestStore()
};
