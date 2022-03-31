const { config } = require('middleware');

exports.info = (req, res, next) => {
  res.locals = {
    message: 'API is up and running',
    data: {
      currentVersion: config.version,
    },
  };
  next();
};
