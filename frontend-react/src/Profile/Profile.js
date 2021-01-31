import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

import useAuth from '../auth/useAuth';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
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

function Profile() {
  const classes = useStyles();
  const { isLoadingAuthStatus, user } = useAuth();
  if (isLoadingAuthStatus) {
    return (
      <div className={classes.verticalCenterContents}>
        <div className={classes.horizontalCenterContents}>
          <CircularProgress size="100px" />
        </div>
      </div>
    );
  }

  return (
    <>
      <Typography variant="h6">Profile</Typography>
      <List component="nav" className={classes.root} aria-label="mailbox folders">
      <Divider />
        <ListItem>
          <ListItemText primary="User ID" secondary={user.userId} />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText primary="User Details" secondary={user.userDetails}  />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText primary="Identity Provider"  secondary={user.identityProvider} />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText primary="Roles"  secondary={ user.userRoles.join(', ') } />
        </ListItem>
      </List>
    </>
  );
}

export default Profile;