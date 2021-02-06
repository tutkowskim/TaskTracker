import React from 'react';
import { Link, Route, Switch, Redirect } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import useAuth from './auth/useAuth';
import login from './auth/login';
import Tasks from './Tasks/Tasks';
import Profile from './Profile/Profile';
import ProfileToolbarWidget from './Profile/ProfileToolbarWidget';

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
    color: 'inherit',
    textDecoration: 'none',
  },
  appContent: {
    flexBasis: 'calc(100% - 64px)',
    flexGrow: 1,
    flexShrink: 1,
  },
  verticalCenterContents: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  horizontalCenterContents: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  }
}));

function CenteredLoginButton() {
  const classes = useStyles();
  return (
    <div className={classes.verticalCenterContents}>
      <div className={classes.horizontalCenterContents}>
        <Button onClick={login}>Login</Button>
      </div>
    </div>
  );
}

function DisableUser() {
  const classes = useStyles();
  return (
    <div className={classes.verticalCenterContents}>
      <div className={classes.horizontalCenterContents}>
        <Typography variant="body1">This user account is currently disabled. Please contact the system administrator to unblock this account.</Typography>
      </div>
    </div>
  );
}

function App() {
  const classes = useStyles();
  const { isLoadingAuthStatus, isAuthenticated, user } = useAuth();

  return (
    <div className={classes.app}>
      <AppBar position="static">
        <Toolbar className={classes.toolBar}>
          <Link to='/' className={classes.title}>
            <Typography variant="h6">Task Tracker</Typography>
          </Link>
          <ProfileToolbarWidget />        
        </Toolbar>
      </AppBar>
      <Container className={classes.appContent} maxWidth="lg">
        { !isLoadingAuthStatus && isAuthenticated &&
          <Switch>
            <Route path="/" component={user.isDisabled ? DisableUser : Tasks} exact />
            <Route path="/profile" component={Profile} exact />
            <Redirect from="*" to="/" />
          </Switch>
        }
        { !isLoadingAuthStatus && !isAuthenticated &&
          <CenteredLoginButton />
        }
      </Container>
    </div>
  );
}

export default App;
