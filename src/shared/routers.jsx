import React from 'react';
import { Switch, Route } from 'react-router-dom';
import TestPage from 'shared/pages/TestPage/';
import AuthorizationForm from 'shared/pages/AuthorizationForm/';

const routers = (
  <Switch>
    <Route exact path='/' component={AuthorizationForm} />
    <Route exact path='/staff' component={TestPage} />
  </Switch>
);

export default routers;
