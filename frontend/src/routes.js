import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Login from './pages/Login';
import Reset from './pages/Reset';
import Register from './pages/Register';
import Home from './pages/Home';
import ChangePassword from './pages/ChangePassword';

export default function Routes() {
  const id = localStorage.getItem('userID');
  const logged = id !== null ? true : false;
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          {logged ? <Home /> : <Redirect to="/login" />}
        </Route>
        <Route path="/login" component={Login} />
        <Route path="/reset" component={Reset} />
        <Route path="/register" component={Register} />
        <Route path="/change-password" component={ChangePassword} />
      </Switch>
    </BrowserRouter>
  );
}
