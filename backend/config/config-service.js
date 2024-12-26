const fs = require('fs');
const path = require('path');
const pathConfig = path.join(process.cwd(), 'config.json');
const configExist = fs.existsSync(pathConfig);
const config = require('./config');
let configData;
if (configExist) {
  const data = fs.readFileSync(pathConfig, { encoding: 'utf8', flag: 'r' });
  configData = JSON.parse(data);
}

const getConfig = () => {
  if (configExist) {
    return configData;
  } else {
    return config;
  }
};

exports.getConfig = getConfig;