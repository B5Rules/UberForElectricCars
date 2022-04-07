const mongoose = require('mongoose');
const { app, dynamicPort } = require('./app');
const { config } = require('./middleware');
// eslint-disable-next-line no-unused-vars
const { admin } = require('./services');

LOG(`Started API with version ${config.version}`);
mongoose.connect(config.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  tlsInsecure: true,
});
const db = mongoose.connection;

// TODO: Add a log_error here!!
// eslint-disable-next-line no-console
db.on('error', console.error.bind(console, `[${config.apiName}] App failed to connect to database!`));
db.once('open', () => {
  LOG('App connected to database!');
  app.listen(dynamicPort, () => {
    LOG(`Listening on port ${dynamicPort}...`);
  });
});
