const { readFile, writeFile } = require('fs').promises;

const path = require('path');

const getPath = path.resolve(__dirname, '..', 'talker.json');

const getAllFiles = async () => {
  const response = await readFile(getPath, 'utf8');
  const files = JSON.parse(response);
  console.log(files);
  return files;
};
const writeFiles = async (dados) => { // dados não sei o que vou receber , então deixo de forma dinamica
  await writeFile(getPath, JSON.stringify(dados));
};

module.exports = {
  getAllFiles,
  writeFiles,
  getPath,
};