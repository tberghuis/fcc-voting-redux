// require('dotenv').config(); 
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Home from './components/Home';
import Login from './components/Login';


import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import 'normalize.css';

console.log(process.env.REACT_APP_SECRET);
// console.log(process.env.SECRET);


ReactDOM.render(
  (
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="login" component={Login} />
      </Route>
    </Router>
  ),
  document.getElementById('root')
);


