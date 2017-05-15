import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import store from './store';

// in console run _state()
window._state = store.getState;

import App from './App';
// import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import CreatePoll from './components/CreatePoll';
import Poll from './components/Poll';
import PollResult from './components/PollResult';
import AllPolls from './components/AllPolls';
import MyPolls from './components/MyPolls';

//import 'semantic-ui-css/semantic.min.css';
import 'semantic-ui-css/semantic.css';

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
          <IndexRoute component={AllPolls} />
          <Route path="login" component={Login} />
          <Route path="register" component={Register} />
          <Route path="createpoll" component={CreatePoll} onEnter={requireAuth} />
          <Route path="mypolls" component={MyPolls} onEnter={requireAuth} />
          <Route path="/poll/:id" component={Poll} />
          <Route path="/poll/:id/result" component={PollResult} />
        </Route>
      </Router>
    </Provider>
  ),
  document.getElementById('root')
);
