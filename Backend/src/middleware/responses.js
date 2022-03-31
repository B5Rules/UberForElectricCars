const { StatusCodes } = require('http-status-codes');
const config = require('./env');
/**
 * Just a  middleware for express to handle and normalize all error responses. (called by default by express)
 * @param {*} err middleware param
 * @param {*} req middleware param
 * @param {*} res middleware param
 * @param {*} next middleware param
 */
// eslint-disable-next-line no-unused-vars
exports.errorHandler = (err, req, res, next) => {
  if (config.env === 'dev') {
    // eslint-disable-next-line no-console
    console.error(err.stack);
  }

  res.status(err.status || StatusCodes.INTERNAL_SERVER_ERROR).send({
    success: false,
    message: err.message || 'Internal server error. Please try again.',
  });
};

/**
 * Just a  middleware for express to handle and normalize all success responses. (called by default by express)
 * @param {*} err middleware param
 * @param {*} req middleware param
 * @param {*} res middleware param
 * @param {*} next middleware param
 * @example
 * res.locals = {
 *    message: 'Hello world'
 *    data: {firstName: 'zaBogdan'}
 * }
 * next()
 */
// eslint-disable-next-line no-unused-vars
exports.successHandler = (req, res, next) => {
  const { message, data, statusCode } = res.locals;

  res.status(statusCode || StatusCodes.OK).send({
    success: true,
    message: message || 'Success',
    data: data,
  });
};
