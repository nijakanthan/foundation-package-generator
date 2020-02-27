let fs = require('fs');

const readJsonFile = (jsonPath) => {
  let jsonData = fs.readFileSync(jsonPath);

  let obj = JSON.parse(jsonData);
  return obj;
}

module.exports = {
    readJsonFile
}