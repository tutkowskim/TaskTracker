import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import useAuth from './auth/useAuth';
import DisabledUserPage from './auth/DisabledUserPage';
import LoginPage from './auth/LoginPage';
import Tasks from './Tasks/Tasks';
import Profile from './Profile/Profile';

function RouterOutlet() {
  const { user, isAuthenticated, isLoadingAuthStatus } = useAuth();
  if (isLoadingAuthStatus) {
    return <></>
  } else if (!isAuthenticated) {
    return <LoginPage />
  } else if (user.isDisabled) {
    return <DisabledUserPage />
  }

  return (
    <Switch>
      <Route path="/" component={Tasks} exact />
      <Route path="/profile" component={Profile} exact />
      <Redirect from="*" to="/" />
    </Switch>
  )
}

export default RouterOutlet
