const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const { getAllFiles } = require('./utils/utils');

const app = express();
app.use(express.json());
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = 3000;
const HTTP_BAD_REQUEST = 400;
// o primeiro onde estará o recurso
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_request, response) => { // one
  const files = await getAllFiles();
  response.status(HTTP_OK_STATUS).json(files);
});

app.get('/talker/:id', async (request, response) => { // two;
  const idGet = request.params.id;
  const readFile = await getAllFiles();
  const talkerId = readFile.find(({ id }) => id === Number(idGet));
  if (talkerId) {
    response.status(HTTP_OK_STATUS).json(talkerId);
  }
  if (!talkerId) {
    response.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
});
// aqui dará 16
const validarTk = () => crypto.randomBytes(8).toString('hex');
// console.log(validarTk);
const validarEmail = (request, response, next) => {
  const regex = /^\w+@\w+\.\w+$/;
  const { email } = request.body;
  if (!email) {
    return response.status(HTTP_BAD_REQUEST).json({
      message: 'O campo "email" é obrigatório',
    });
  }
  if (!regex.test(email)) {
    return response.status(HTTP_BAD_REQUEST).json({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }

  next();
};

const validarPassWord = (request, response, next) => {
  const { password } = request.body;
  if (!password) {
    return response.status(HTTP_BAD_REQUEST).json({
      message: 'O campo "password" é obrigatório',
    });
  }

  if (password.length < 6) {
    return response.status(HTTP_BAD_REQUEST).json({
      message: 'O "password" deve ter pelo menos 6 caracteres',
    });
  }
  next();
};
app.post('/login', validarEmail, validarPassWord, async (_request, response) => {
  const tk = validarTk();
  response.status(HTTP_OK_STATUS).json({ token: tk });
});

app.listen(PORT, () => {
  console.log('Online');
});

module.exports = {
  // app,
  validarEmail,
  validarPassWord,
};
