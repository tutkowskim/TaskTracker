import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import useAuth from './auth/useAuth';
import DisabledUser from './auth/DisabledUser';
import Tasks from './Tasks/Tasks';
import Profile from './Profile/Profile';

function RouterOutlet() {
  const { user, isAuthenticated, isLoadingAuthStatus } = useAuth();
  if (!isAuthenticated || isLoadingAuthStatus) {
    return <></>
  } else if (user.isDisabled) {
    return <DisabledUser />
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
