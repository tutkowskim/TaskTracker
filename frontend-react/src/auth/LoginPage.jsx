import React from 'react';
import { makeStyles } from '@material-ui/core';
import LoginWithGoogleButton from './LoginWithGoogleButton';

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

function LoginPage() {
  const classes = useStyles();
  return (
    <div className={classes.verticalCenterContents}>
      <div className={classes.horizontalCenterContents}>
        <LoginWithGoogleButton />
      </div>
    </div>
  );
}

export default LoginPage
