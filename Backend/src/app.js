// packages
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const compression = require('compression');

// absolute path
process.env.NODE_PATH = __dirname;
// eslint-disable-next-line no-underscore-dangle
require('module').Module._initPaths();

// custom modules
const models = require('./models');
const router = require('./router');
const { config, errorHandler, successHandler } = require('./middleware');
const { corsList } = require('./cors');
// eslint-disable-next-line no-unused-vars
const { uberApi } = require('./modules');

const app = express();

app.use(compression());
app.use(cors({
  credentials: true,
  origin: corsList,
  exposedHeaders: ['set-cookie'],
}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, rest, next) => {
  req.db = models;
  next();
});
app.use('/', router);
app.use(successHandler);
app.use(errorHandler);

const dynamicPort = config.PORT || process.env.PORT;
module.exports = { app, dynamicPort };
