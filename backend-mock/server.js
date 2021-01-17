const bodyParser = require('body-parser');
const express = require('express');

const app = express();
app.use(bodyParser.json());
const port = 3030;

let idCounter = 0;
let mockTasks = [
  { id: `${++idCounter}`, name: `New Task ${idCounter}`, userId: "mockUserId", complete: false },
  { id: `${++idCounter}`, name: `New Task ${idCounter}`, userId: "mockUserId", complete: false },
  { id: `${++idCounter}`, name: `New Task ${idCounter}`, userId: "mockUserId", complete: false },
]

app.get('/api/GetTasks', (req, res) => {
  res.json(mockTasks);
});

app.post('/api/AddTask', (req, res) => {
  const name = (req.query.name || (req.body && req.body.name));
  if (name) {
    mockTasks = [
      ...mockTasks,
      { id: `${++idCounter}`, name, userId: "mockUserId", complete: false },
    ];
    res.json({});
  } else {
    res.json({});
  }
});

app.post('/api/DeleteTask', (req, res) => {
  const id = (req.query.id || (req.body && req.body.id));
  console.log(`Deleting task ${id}`)
  if (!id) {
    res.json('id not specified for task' );
    return;
  }

  if (!mockTasks.find(task => task.id === id)) {
    res.json(`Task not found for id: ${id}`);
    return;
  }

  mockTasks = mockTasks.filter(task => task.id !== id);
  res.json(`Deleted task with id: ${id}`);
});

app.get('/api/EditTask', (req, res) => {
  const id = (req.query.id || (req.body && req.body.id));
  const name = (req.query.name || (req.body && req.body.name));
  const complete = (req.query.complete || (req.body && req.body.complete));

  const task = mockTasks.find(task => task.id === id);
  if (task) {
    if (name) task.name = name;
    if (complete) task.complete = (complete === 'true');
    res.send(`Task ${id} updated`);
  } else {
    res.send(`Task not found for id: ${id}`);
  }
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