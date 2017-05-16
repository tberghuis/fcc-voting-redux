import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'; 

import agent from './agent';
import Header from './components/Header.js';

import {
  REDIRECT,
  APP_LOAD
} from './constants/actionTypes';

const mapStateToProps = state => ({
  redirectTo: state.common.redirectTo
});

const mapDispatchToProps = dispatch => ({
  onLoad: () =>
    dispatch({ type: APP_LOAD, jwt: true }),
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
      // to redesign...
      this.props.onLoad();
    }
  }


  render() {
    return (

      <div className="App">
        <div className="App-header">
          <Header />
        </div>
        <div style={{margin:'20px',marginBottom:'25px'}}>
          {this.props.children}
        </div>
      </div>

    );
  }
}

// TODO warning deprecated
App.contextTypes = {
  //router: React.PropTypes.object.isRequired
  router: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
