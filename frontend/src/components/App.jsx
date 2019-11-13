import * as React from 'react';
import {inject, observer} from "mobx-react";

@inject("apiTest", "counter")
@observer
export class App extends React.Component {
  render() {
    const {apiTest, counter} = this.props;
    return (
      <div>
        <h1>React-mobx-webpack-express</h1>
        <h2>Counter</h2>
        <p>
          {counter.count}&nbsp;
          <button onClick={() => counter.add()}>Add 1</button>
        </p>
        <h2>API test</h2>
        <p>Message: {apiTest.message}</p>
        <p>
          <button onClick={() => apiTest.loadMessage()}>Load Message</button>
        </p>
      </div>
    );
  }
}
