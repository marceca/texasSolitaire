import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div>
        <h1>This is the base shell.</h1>
        <ul>
          <li>
            <h3>You need to add your reducers file under state/reducers/applicationReducer.js</h3>
          </li>
          <li>
            <h3>Change your Application starting with this file App.js located at: client/components/App.js</h3>
          </li>
          <li>
            <h3>Add your server information under: server/server.js</h3>
          </li>
        </ul>
      </div>
    );
  }
}

export default App;
