import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import {
  Avatar,
  Typography,
  makeStyles,
  Button,
  Popper,
  Grow,
  ClickAwayListener,
  MenuList,
  Paper,
  MenuItem,
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const useStyles = makeStyles((theme) => ({
  userProfile: {
    display: 'flex',
    flexDirection: 'row',
  },
  avatar: {
    height: '30px',
    width: '30px',
  },
  userName: {
    margin: 'auto',
    paddingLeft: '5px',
  },
  dropDownArrow: {
    margin: 'auto',
  }
}));

function UserProfileAppBar() {
  const classes = useStyles();
  const { user, isAuthenticated, isLoading, logout } = useAuth0();
  const [showMenu, setShowMenu] = useState(false);
  const menuAnchorRef = React.useRef<HTMLButtonElement>(null);

  if (isLoading || !isAuthenticated) {
    return <></>;
  }

  const toggleMenu = () => setShowMenu(!showMenu);

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (menuAnchorRef.current && menuAnchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setShowMenu(false);
  };

  const handleLogout =(event: React.MouseEvent<EventTarget>) => {
    if (menuAnchorRef.current && menuAnchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setShowMenu(false);
    logout();
  };
  
  return (
    <>
      <Button color='inherit' className={classes.userProfile} ref={menuAnchorRef} onClick={toggleMenu}>
        <Avatar className={classes.avatar} src={user.picture} alt={user.name} />
        <Typography className={classes.userName}>{user.name}</Typography>
        <ArrowDropDownIcon className={classes.dropDownArrow} />
      </Button>
      <Popper open={showMenu} anchorEl={menuAnchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={showMenu} id="menu-list-grow">
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
    </>
  );
}

export default UserProfileAppBar;
