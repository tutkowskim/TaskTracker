var express = require('express');
var router = express.Router();

const noUser = {
  clientPrincipal: null,
};

const mockDisabledUser = {
  clientPrincipal: { 
    identityProvider: 'google',
    userId: 'mockUserId',
    userDetails: 'mockuser@gmail.com',
    userRoles: [
      'anonymous',
      'authenticated'
    ],
  },
};

const mockUser = {
  clientPrincipal: { 
    identityProvider: 'google',
    userId: 'mockUserId',
    userDetails: 'mockuser@gmail.com',
    userRoles: [
      'user',
      'anonymous',
      'authenticated'
    ],
  },
};

let currentUser = noUser;

router.get('/.auth/login/google', (req,res) => {
  currentUser = mockUser;
  res.send(`
    <!doctype html>
    <html lang="en">
    <head>
      <meta http-equiv="refresh" content="1; URL=${req.query.post_login_redirect_uri}" />
    </head>
    <body>
      Logging in!
    </body>
    </html>
  `);
});

router.get('/.auth/logout', (req,res) => {
  currentUser = noUser;
  res.send(`
    <!doctype html>
    <html lang="en">
    <head>
      <meta http-equiv="refresh" content="1; URL=${req.query.post_logout_redirect_uri}" />
    </head>
    <body>
      Logging out!
    </body>
    </html>
  `);
});

router.get('/.auth/me', (req, res) => {
  res.json(currentUser);
});

module.exports = router;