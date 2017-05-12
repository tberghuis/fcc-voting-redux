import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import store from './store';

// in console run _state()
window._state = store.getState;

import App from './App';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import CreatePoll from './components/CreatePoll';

import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();


// ?????
// import 'normalize.css';
import './style.css';


function requireAuth(nextState, replace) {
  if (!store.getState().common.loggedIn) {
    replace({
      pathname: '/'
    })
  }
}


ReactDOM.render(
  (
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Home} />
          <Route path="login" component={Login} />
          <Route path="register" component={Register} />
          <Route path="createpoll" component={CreatePoll} onEnter={requireAuth} />
        </Route>
      </Router>
    </Provider>
  ),
  document.getElementById('root')
);
