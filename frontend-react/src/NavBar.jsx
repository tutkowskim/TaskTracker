import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, makeStyles } from '@material-ui/core';
import ProfileToolbarWidget from './Profile/ProfileToolbarWidget';

const useStyles = makeStyles(() => ({
  toolBar: {
    height: '64px',
  },
  title: {
    flexGrow: 1,
    color: 'inherit',
    textDecoration: 'none',
  },
}));

function NavBar() {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar className={classes.toolBar}>
        <Link to='/' className={classes.title}>
          <Typography variant="h6">Task Tracker</Typography>
        </Link>
        <ProfileToolbarWidget />        
      </Toolbar>
    </AppBar>
  )
}

export default NavBar;
