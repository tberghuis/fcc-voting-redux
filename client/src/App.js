import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { connect } from 'react-redux';
import { REDIRECT } from './constants/actionTypes';

import agent from './agent';

import Header from './components/Header.js';

const mapStateToProps = state => ({
  redirectTo: state.common.redirectTo
});

const mapDispatchToProps = dispatch => ({
  onRedirect: () =>
    dispatch({ type: REDIRECT })
});


class App extends Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      this.context.router.replace(nextProps.redirectTo);
      this.props.onRedirect();
    }
  }
  componentWillMount() {
    const token = window.localStorage.getItem('jwt');
    if (token) {
      agent.setToken(token);
    }
  }


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

// export default App;

App.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
