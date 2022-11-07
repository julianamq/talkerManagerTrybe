const express = require('express');
const bodyParser = require('body-parser');
const { getAllFiles } = require('./utils/utils');

const app = express();
app.use(express.json());
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';
// o primeiro onde estará o recurso
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_request, response) => { // one
  const files = await getAllFiles();
  response.status(HTTP_OK_STATUS).json(files);
});

app.listen(PORT, () => {
  console.log('Online');
});

module.exports = app;