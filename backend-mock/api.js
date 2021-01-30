var express = require('express');
var router = express.Router();

let idCounter = 0;
let mockTasks = [
  { name: `New Task ${idCounter}`, complete: false },
  { name: `New Task ${idCounter}`, complete: true },
  { name: `New Task ${idCounter}`, complete: false },
]

router.get('/api/GetTasks', (req, res) => {
  res.json(mockTasks);
});

router.post('/api/SetTasks', (req, res) => {
  const tasks = req.body;
  mockTasks = tasks;
  console.log(mockTasks)
  res.json('Set Tasks');
});

module.exports = router;