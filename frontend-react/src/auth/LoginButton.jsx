import React from 'react';
import { Button, makeStyles } from '@material-ui/core';
import login from './login';

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

function LoginButton() {
  const classes = useStyles();
  return (
    <div className={classes.verticalCenterContents}>
      <div className={classes.horizontalCenterContents}>
        <Button onClick={login}>Login</Button>
      </div>
    </div>
  );
}

export default LoginButton
