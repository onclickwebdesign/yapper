import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, Switch, BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import Register from './components/Register';
import Header from './components/Header';
import Login from './components/Login';
import Profile from './components/Profile';
import NotFound from './components/NotFound';
import * as serviceWorker from './serviceWorker';

const routing = (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route path="/profile" component={Profile} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
