import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import store from './store';

import App from './App';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';

import 'normalize.css';

// console.log(process.env.REACT_APP_SECRET);
// console.log(process.env.SECRET);


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


