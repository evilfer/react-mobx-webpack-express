import * as React from 'react';
import {createBrowserHistory} from "history";
import {App} from "./App";
import {Provider} from "mobx-react";
import {syncHistoryWithStore} from "mobx-react-router";
import {Router} from "react-router";
import {stores} from '../stores/init'

const browserHistory = createBrowserHistory();
const history = syncHistoryWithStore(browserHistory, stores.router);

export function Main() {
  return (
    <Provider {...stores}>
      <Router history={history}>
        <App/>
      </Router>
    </Provider>
  );
}
