import React from 'react';
import { useHistory } from "react-router-dom";
import { Button, Menu, MenuItem, makeStyles, withWidth, isWidthUp } from '@material-ui/core';
import { AccountCircle, ArrowDropDown } from '@material-ui/icons';

import useAuth from '../auth/useAuth'; 
import logout from '../auth/logout';

const useStyles = makeStyles(() => ({
  userName: {
    paddingLeft: '5px',
  },
}));

function ProfileToolbarWidget({ width }) {
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { isLoadingAuthStatus, isAuthenticated, user } = useAuth();

  if (isLoadingAuthStatus || !isAuthenticated) {
    return <></>;
  }

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleOpenProfile = () => {
    history.push('/profile');
    handleClose();
  }

  return (
    <>
      <Button color="inherit" onClick={handleClick}>
        <AccountCircle />
        { isWidthUp('sm', width) && <span className={classes.userName}>{ user.userDetails }</span> }
        <ArrowDropDown />
      </Button>
      <Menu id="menu" anchorEl={anchorEl} anchorOrigin={{ vertical: 'bottom', horizontal: 'right'}} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleOpenProfile}>Profile</MenuItem>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
    </>
  )
}

export default withWidth()(ProfileToolbarWidget);