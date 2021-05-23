import React from 'react';
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import useWindowSize from '../useWindowSize';
import useAuth from '../auth/useAuth';

const useStyles = makeStyles((theme) => ({
  userName: {
    paddingLeft: '5px',
  },
}));

function ProfileToolbarWidget() {
  const classes = useStyles();
  const history = useHistory();
  const windowSize = useWindowSize();
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
  const handleLogout = () => {}

  return (
    <>
      <Button color="inherit" onClick={handleClick}>
        <AccountCircleIcon />
        { windowSize.width > 600 && <span className={classes.userName}>{ user.userDetails }</span> }
        <ArrowDropDownIcon />
      </Button>
      <Menu id="menu" anchorEl={anchorEl} anchorOrigin={{ vertical: 'bottom', horizontal: 'right'}} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleOpenProfile}>Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  )
}

export default ProfileToolbarWidget;