// node imports
const { StatusCodes } = require('http-status-codes');

// custom modules
const { Password, Session, ErrorWithStatusCode } = require('modules');
const { config } = require('middleware');
const { getAuth } = require('firebase-admin/auth');

/**
 * @name /auth/register
 * @function registerUser
 * @param {object} user - The user object that's going to be inserted
 * @description Add a new user to the database
 * @example POST /auth/register
 {
    "username": "zaBogdan",
    "email": "bzavadovschi@pground.io",
    "firstName": "Bogdan",
    "lastName": "Zavadovschi",
    "password": "P@ssw0rd1",
    "inviteCode": "744ec72f-12dc-41d0-8d59-f6db46d2c5dc"
  }
 */
exports.registerUser = async (req, res, next) => {
  try {
    const { body: payload } = req;

    // checks for inviteCode. This part can be later removed without many problems.
    const { inviteCode: payloadCode } = payload;

    if (payloadCode === undefined || payloadCode === null) {
      throw new ErrorWithStatusCode('You can register based on invite code only.', StatusCodes.UNAUTHORIZED);
    }

    const inviteCode = await req.db.InviteCodes.findOne({ code: payloadCode });
    if (inviteCode === null) {
      throw new ErrorWithStatusCode('Invalid invite code.', StatusCodes.UNAUTHORIZED);
    }
    if (inviteCode.linkedToEmail !== payload.email) {
      throw new ErrorWithStatusCode('Invalid invite code.', StatusCodes.UNAUTHORIZED);
    }
    if (inviteCode.activeUntil > Date().now || inviteCode.used === true) {
      throw new ErrorWithStatusCode('Invite code has expired.', StatusCodes.UNAUTHORIZED);
    }
    // end  inviteCode checks.

    const firebaseUser = await getAuth().createUser({
      email: payload.email,
      password: payload.password,
      displayName: `${payload.firstName} ${payload.lastName}`,
    });

    const user = {
      firebaseUID: firebaseUser.uid,
      // keep it now to write some tests
      password: await Password.generate(payload.password),
      username: payload.username,
      email: payload.email,
      firstName: payload.firstName,
      lastName: payload.lastName,
      role: inviteCode.role,
    };

    const newUser = new req.db.Users(user);
    await newUser.save().catch((err) => {
      switch (err.code) {
        case 11000:
          throw new ErrorWithStatusCode('User with email and username already exists.');
        case 211:
          throw new ErrorWithStatusCode('There was an issue with our database. Try again.');
        case 11600:
          throw new ErrorWithStatusCode('There was an issue with our database. Try again.');
        default:
          throw new ErrorWithStatusCode('There was a problem with the request. Try again.');
      }
    });

    delete user.password;

    // invalidating the invite code because it will not be needed anymore.
    inviteCode.used = true;
    inviteCode.activeUntil = new Date((new Date()).getTime() - 24 * 60 * 60);
    await inviteCode.save().catch((err) => {
      throw new ErrorWithStatusCode(`Failed to invalidate the inviteCode. Error code: ${err.code}`);
    });

    // adding the response to the server.
    res.locals = {
      message: `User with email ${payload.email} successfully registered.`,
      data: user,
    };
    next();
  } catch (error) {
    next({
      status: error.statusCode,
      message: error.message,
      stack: error.stack,
    });
  }
};

/**
 * @name /auth/login
 * @function login
 * @param {String} email/username - the username or email
 * @param {String} password  - the password
 * @description Generate a new user session, sending both 2 httpOnly cookies and accessToken + refreshToken in the response
 * @example POST /auth/register
 {
    "email": "bzavadovschi@pground.io",
    "password": "P@ssw0rd1",
  }
 */
exports.login = async (req, res, next) => {
  try {
    /**
     * Here we should introduce two things:
     * Z-Source: Dashboard/App (ofc more custom things)
     * It should check if it's one of these, the header is also a must
     * if the heaader is not present throw 401.
     */
    const { body: payload } = req;

    const user = await req.db.Users.findOne({
      $or: [
        { username: payload.username?.toLowerCase() },
        { email: payload.email?.toLowerCase() },
      ],
    });

    if (user === null) {
      throw new ErrorWithStatusCode('Incorrect username or password.');
    }

    if ((await Password.verify(payload.password, user.password)) === false) {
      throw new ErrorWithStatusCode('Incorrect username or password.');
    }

    const tokens = await Session.generate(req.db.Sessions, user);

    const options = {
      httpOnly: true,
      secure: config.env !== 'dev',
      sameSite: 'strict',
      path: '/',
    };

    res.cookie('accessToken', tokens.accessToken, {
      ...options,
      maxAge: 60 * 60 * 2 * 1000,
    });

    res.cookie('refreshToken', tokens.refreshToken, {
      ...options,
      maxAge: 60 * 60 * 24 * 2 * 1000,
    });

    // adding the response to the server.
    res.locals = {
      message: 'Successfully logged in.',
      data: tokens,
    };
    next();
  } catch (error) {
    next({
      status: error.statusCode,
      message: error.message,
      stack: error.stack,
    });
  }
};

exports.logout = (req, res, next) => {
  try {
    // TODO:  Check if the user is actually logged in.

    const options = {
      httpOnly: true,
      secure: config.env !== 'dev',
      sameSite: 'strict',
      path: '/',
    };

    res.cookie('accessToken', '', {
      ...options,
      maxAge: -60 * 60 * 2 * 1000,
    });

    res.cookie('refreshToken', '', {
      ...options,
      maxAge: -60 * 60 * 24 * 2 * 1000,
    });

    // adding the response to the server.
    res.locals = {
      message: 'Successfully logged in.',
    };
    next();
  } catch (error) {
    next({
      status: error.statusCode,
      message: error.message,
      stack: error.stack,
    });
  }
};
