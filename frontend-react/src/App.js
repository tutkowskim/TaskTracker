import React from 'react';
import { Link, Route, Switch, Redirect } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

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
}));

function App() {
  const classes = useStyles();

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
        <Switch>
          <Route path="/" component={Tasks} exact />
          <Route path="/profile" component={Profile} exact />
          <Redirect from="*" to="/" />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
