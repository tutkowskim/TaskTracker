import React from 'react';
import { makeStyles } from '@material-ui/core';
import login from './login';

const white = '#fff';
const googleBlue = '#4285f4';
const buttonActiveBlue = '#1669F2';

const useStyles = makeStyles(() => ({
  button: {
    width: '190px',
    height: '42px',
    backgroundColor: googleBlue,
    borderRadius: '2px',
    boxShadow: '0 3px 4px 0 rgba(0,0,0,.25)',
    '&:hover': {
      boxShadow: `0 0 6px ${googleBlue}`,
    },
    '&:active': {
      background: buttonActiveBlue,
    },
    '& > *': {
      userSelect: 'none',
    }
  },
  iconWrapper: {
    position: 'absolute',
    marginTop: '1px',
    marginLeft: '1px',
    width: '40px',
    height: '40px',
    borderRadius: '2px',
    backgroundColor: white,
  },
  icon: {
    position: 'absolute',
    marginTop: '11px',
    marginLeft: '11px',
    width: '18px',
    height: '18px',
  },
  text: {
    float: 'right',
    margin: '11px 11px 0 0',
    color: white,
    fontSize: '14px',
    letterSpacing: '0.2px',
  },
}));

function LoginWithGoogleButton() {
  const classes = useStyles()
  return (
    <div class={classes.button} onClick={login}>
      <div class={classes.iconWrapper}>
        <img class={classes.icon} src='/GoogleLogo.svg' alt='Sign in with google' />
      </div>
      <p class={classes.text}><b>Sign in with google</b></p>
    </div>
  )
}

export default LoginWithGoogleButton
