import React from 'react';
import { Container, CssBaseline, makeStyles, ThemeProvider } from '@material-ui/core';

import theme from './theme';
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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={classes.app}>
        <NavBar />
        <Container className={classes.appContent} maxWidth="lg">
          { !isLoadingAuthStatus && isAuthenticated && <RouterOutlet /> }
          { !isLoadingAuthStatus && !isAuthenticated && <LoginButton /> }
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
