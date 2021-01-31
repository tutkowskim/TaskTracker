import React from 'react';
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
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
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleOpenProfile = () => {
    history.push('/profile');
    handleClose();
  }

  return (
    <>
      <Button color="inherit" onClick={handleClick}>
        <AccountCircleIcon />
        <span className={classes.userName}>mockuser@gmail.com</span>
        <ArrowDropDownIcon />
      </Button>
      <Menu id="menu" anchorEl={anchorEl} anchorOrigin={{ vertical: 'bottom', horizontal: 'right'}} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleOpenProfile}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </>
  )
}

export default ProfileToolbarWidget;