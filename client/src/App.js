import React, { Component } from 'react';

import Header from './components/Header.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <Header />
        </div>
        {this.props.children}
      </div>
    );
  }
}

export default App;
