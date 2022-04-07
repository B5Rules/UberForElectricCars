// npm modules
const { StatusCodes } = require('http-status-codes');

// custom modules
const { Token, Session, ErrorWithStatusCode } = require('modules');

/**
 * Trying to get the Bearer authentication token from Headers.
 * @param {object} headers - The req.headers object
 * @returns string composed from the Bearer token
 */
const getTokenFromAuthorizationHeader = (headers) => {
  const { authorization: data } = headers;
  if (!data) return '';

  // check if we have right authentication type
  const [type, token] = data.split(' ');
  if (type !== 'Bearer') throw new Error('Invalid authentication type. Allowed types: Bearer');
  return token;
};

/**
 * Trying to get the access and/or refresh token from cookies.
 * @param {object} cookies - The req.cookies object
 * @returns a string representing either the accessToken or the refresh token.
 */
const getTokenFromCookie = (cookies) => {
  if (!cookies.accessToken && !cookies.refreshToken) return '';
  if (cookies.accessToken) return cookies.accessToken;
  return cookies.refreshToken;
};

/**
 * Checking authentication cookies/token for the user.
 * @param {function} requirements - If the route needs specific requirements pass a function that does the checking.
 * @returns boolean - if the tokens are valid and the session information is accurate the returns true, otherwise false.
 */
const schemaValidation = (requirements) => async (req, res, next) => {
  try {
    // support for both Authentication : Bearer and cookies <3
    let token = getTokenFromAuthorizationHeader(req.headers);
    if (token === '') token = getTokenFromCookie(req.cookies);

    if (token === '') throw new ErrorWithStatusCode('You must be authenticated to use this route.', StatusCodes.FORBIDDEN);
    // check the integrity of the token
    const [tokenData, tokenIntegrity] = await Token.validate(token);

    if (tokenIntegrity !== true) throw new ErrorWithStatusCode('Token is invalid. Try to login again.', StatusCodes.FORBIDDEN);

    // check the session to be valid
    if ((await Session.validate(req.db.Sessions, tokenData)) !== true) {
      throw new ErrorWithStatusCode('The session that you are trying to use is invalid..', StatusCodes.FORBIDDEN);
    }

    // save the data for later.
    res.locals.tokenData = tokenData;

    // check if we are authorized to do this request (if needed)
    if (requirements === undefined) {
      return next();
    }

    // check the requirements
    if (requirements(tokenData, req.body) !== true) {
      throw new ErrorWithStatusCode('You don\'t have enough permissions.', StatusCodes.UNAUTHORIZED);
    }
    next();
  } catch (error) {
    next({
      status: error.statusCode,
      message: error.message,
      stack: error.stack,
    });
  }
  return true;
};
module.exports = schemaValidation;
