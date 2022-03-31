const dotenv = require('dotenv');

const ENV = process.env.APP_ENV || 'dev';

const dotEnvConfig = dotenv.config({
  path: `./configs/${ENV}.env`,
}).parsed;

// add here custom variables if you need
const config = {
  ...dotEnvConfig,
  env: ENV.toLocaleLowerCase(),
  apiName: 'ZApollo',
  version: '0.1',
};

module.exports = config;
