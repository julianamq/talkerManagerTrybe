const { readFile } = require('fs').promises;

const path = require('path');

const getPath = path.resolve(__dirname, '..', 'talker.json');

const getAllFiles = async () => {
  const response = await readFile(getPath, 'utf8');
  const files = JSON.parse(response);

  return files;
};

module.exports = {
  getAllFiles,
};