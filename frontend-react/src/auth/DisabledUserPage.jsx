import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
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

function DisabledUserPage() {
  const classes = useStyles();
  return (
    <div className={classes.verticalCenterContents}>
      <div className={classes.horizontalCenterContents}>
        <Typography variant="body1">This user account is currently disabled. Please contact the system administrator to unblock this account.</Typography>
      </div>
    </div>
  );
}

export default DisabledUserPage
