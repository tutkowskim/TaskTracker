import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const useStyles = makeStyles((theme) => ({
  userName: {
    paddingLeft: '5px',
  }
}));

function ProfileToolbarWidget() {
  const classes = useStyles();

  return (
    <Button color="inherit">
      <AccountCircleIcon />
      <span className={classes.userName}>mockuser@gmail.com</span>
      <ArrowDropDownIcon />
    </Button>
  )
}

export default ProfileToolbarWidget;