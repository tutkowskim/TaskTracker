const bodyParser = require('body-parser');
const express = require('express');

const app = express();
app.use(bodyParser.json());
const port = 3030;

app.use(require('./api'));
app.use(require('./auth'));

app.listen(port, () => {
  console.log(`Mock backend app listening at http://localhost:${port}`)
});