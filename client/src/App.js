import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Header from './components/Header.js';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <div className="App-header">
            <Header />
          </div>
          {this.props.children}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
