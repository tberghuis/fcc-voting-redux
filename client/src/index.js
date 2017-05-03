import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Home from './components/Home';
import Login from './components/Login';


import { Router, Route, IndexRoute, browserHistory } from 'react-router';



import './index.css';

// ReactDOM.render(
//   <App />,
//   document.getElementById('root')
// );



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


