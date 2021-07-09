import React from 'react';
import { Container, makeStyles } from '@material-ui/core';

import useAuth from './auth/useAuth';
import LoginButton from './auth/LoginButton';
import NavBar from './NavBar';
import RouterOutlet from './RouterOutlet';

const useStyles = makeStyles(() => ({
  app: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },
  appContent: {
    flexBasis: 'calc(100% - 64px)',
    flexGrow: 1,
    flexShrink: 1,
  },
}));

function App() {
  const classes = useStyles();
  const { isLoadingAuthStatus, isAuthenticated } = useAuth();
  return (
    <div className={classes.app}>
      <NavBar />
      <Container className={classes.appContent} maxWidth="lg">
        { !isLoadingAuthStatus && isAuthenticated && <RouterOutlet /> }
        { !isLoadingAuthStatus && !isAuthenticated && <LoginButton /> }
      </Container>
    </div>
  );
}

export default App;
