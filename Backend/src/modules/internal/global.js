const { getCurrentTimeFormat } = require('./time');

// a good idea here would be to use a proper logging class
global.LOG_DEBUG = (msg) => {
  if (process.env.NODE_ENV !== 'prod') {
    const formatedMsg = `${getCurrentTimeFormat()} - [ZApollo][DEBUG] ${msg}`;
    // eslint-disable-next-line no-console
    console.log(formatedMsg);
  }
};

global.LOG = (msg) => {
  const formatedMsg = `${getCurrentTimeFormat()} - [ZApollo] ${msg}`;
  // eslint-disable-next-line no-console
  console.log(formatedMsg);
};