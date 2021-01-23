const bodyParser = require('body-parser');
const express = require('express');

const app = express();
app.use(bodyParser.json());
const port = 3030;

let idCounter = 0;
let mockTasks = [
  { name: `New Task ${idCounter}`, complete: false },
  { name: `New Task ${idCounter}`, complete: true },
  { name: `New Task ${idCounter}`, complete: false },
]

app.get('/api/GetTasks', (req, res) => {
  res.json(mockTasks);
});

app.post('/api/SetTasks', (req, res) => {
  const tasks = req.body;
  mockTasks = tasks;
  console.log(mockTasks)
  res.json('Set Tasks');
});

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