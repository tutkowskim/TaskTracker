const express = require('express');
const app = express();
const port = 3030;

app.get('/.auth/me', (req, res) => {
  const noUser = {
    clientPrincipal: null,
  };

  const mockDisabledUser = {
    clientPrincipal: { 
      identityProvider: 'google',
      userId: 'mockUserId',
      userDetails: 'mpckuser@gmail.com',
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
      userDetails: 'mpckuser@gmail.com',
      userRoles: [
        'user',
        'anonymous',
        'authenticated'
      ],
    },
  };

  // res.json(noUser);
  res.json(mockUser);
  // res.json(mockDisabledUser);
});

app.listen(port, () => {
  console.log(`Mock backend app listening at http://localhost:${port}`)
});