import React from 'react';
import {
  AppBar,
  CircularProgress,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core';

import Tasks from './Tasks';
import LoginButton from './LoginButton';
import { useAuth0 } from '@auth0/auth0-react';
import UserProfileAppBar from './UserProfileAppBar';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  app: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },
  toolBar: {
    height: '64px',
  },
  title: {
    flexGrow: 1,
  },
  appContent: {
    position: 'relative',
    height: 'calc(100% - 64px)',
  },
  centeredContent: {
    margin: 'auto',
  },
}));

function App() {
  const classes = useStyles();
  const { isAuthenticated, isLoading } = useAuth0();

  return (
    <div className={classes.app}>
      <AppBar position='static'>
        <Toolbar className={classes.toolBar}>
          <Typography variant="h6" className={classes.title}>Todo Tracker</Typography>
          { isAuthenticated && <UserProfileAppBar /> }
        </Toolbar>
      </AppBar>
      <div className={classes.appContent}>
          { isLoading ? <CircularProgress /> : isAuthenticated ? <Tasks /> : <LoginButton /> }
      </div>
    </div>
  );
}

export default App;
