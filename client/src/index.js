import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import store from './store';

import App from './App';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';

import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();


// ?????
// import 'normalize.css';
import './style.css';

ReactDOM.render(
  (
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Home} />
          <Route path="login" component={Login} />
          <Route path="register" component={Register} />
        </Route>
      </Router>
    </Provider>
  ),
  document.getElementById('root')
);
