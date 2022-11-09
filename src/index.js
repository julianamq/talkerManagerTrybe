const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const { getAllFiles, writeFiles } = require('./utils/utils');
const {

  validarPassWord,
  validarEmail,
  autorizacao,
  campoNome,
  campoIdade,
  campotalk,
  campoRate,
  campowatchedAt,

} = require('./talkers');

const app = express();
app.use(express.json());
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const HTTP_CREATED = 201;
const PORT = 3000;

// o primeiro onde estará o recurso
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_request, response) => {
  // one
  const files = await getAllFiles();
  response.status(HTTP_OK_STATUS).json(files);
});

app.get('/talker/:id', async (request, response) => {
  // two;
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

app.post('/login', validarEmail, validarPassWord, async (_request, response) => {
  // 4
  const tk = validarTk();
  response.status(HTTP_OK_STATUS).json({ token: tk });
});
app.post('/talker',
  autorizacao,
  campoNome,
  campoIdade,
  campotalk,
  campowatchedAt,
  campoRate,
  async (request, response) => {
    // 5 ;
    const { name, age, talk } = request.body;
    const filesFunct = await getAllFiles();
    let maiorId = 0;
    filesFunct.forEach(({ id }) => {
      if (id > maiorId) {
        maiorId = id;
      }
    });
    filesFunct.push({ name, age, talk, id: maiorId + 1 });
    await writeFiles(filesFunct); // vou add o push na função write e add a talker.json
    response.status(HTTP_CREATED).json({
      name, age, talk, id: maiorId + 1,
    });
  });

app.put(
  '/talker/:id', autorizacao, campoNome, campoIdade, campotalk,
  campowatchedAt, campoRate, async (request, response) => {
    const { id } = request.params;
    const { name, age, talk } = request.body;
    const actTalker = await getAllFiles();
    const newEdit = actTalker.map((idTalker) => {
        if (idTalker.id === Number(id)) {
        const newUpdate = { name, age, talk, id: Number(id) };
        return newUpdate;
      } return idTalker;
    });
   await writeFiles(newEdit); 
   response.status(HTTP_OK_STATUS).json({ name, age, talk, id: Number(id) });
  }, 
);

app.listen(PORT, () => {
  console.log('Online');
});

module.exports = {
  app,
};
