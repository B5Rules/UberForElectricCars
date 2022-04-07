// node imports
const { StatusCodes } = require('http-status-codes');
const { ErrorWithStatusCode } = require('modules');
const { v4: uuidv4 } = require('uuid');
// const { getAuth } = require('firebase-admin/auth');

exports.getAllUsers = async (req, res, next) => {
  try {
    const offset = req.query.offset || 0;
    const limit = Math.min(Math.max(0, req.query.limit || 0), 150);
    const users = await req.db.Users.find({}, { password: 0, __v: 0 })
      .skip(offset)
      .limit(limit)
      .catch((err) => {
        next(err);
      });
    const usersCount = await req.db.Users.count();
    res.locals = {
      message: 'Successfully fetched all users',
      data: {
        count: usersCount,
        users,
      },
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

exports.getAllInvites = async (req, res, next) => {
  try {
    const offset = req.query.offset || 0;
    const limit = Math.min(Math.max(0, req.query.limit || 0), 150);
    const onlyActiveOnes = req.query.all || true;

    const condition = {};
    const filterOptions = { _id: 0, __v: 0 };

    // make sure we don't leak the code to the API
    if (process.env.NODE_ENV !== 'dev') {
      filterOptions.code = 0;
    }

    // getting all invite codes or only active ones (i should do a better check here)
    if (onlyActiveOnes === 'true') {
      condition.used = false;
    }

    const invitations = await req.db.InviteCodes.find(condition, filterOptions)
      .skip(offset)
      .limit(limit)
      .catch((err) => {
        next(err);
      });
    const usersCount = await req.db.InviteCodes.count();
    res.locals = {
      message: 'Successfully fetched all users',
      data: {
        count: usersCount,
        invitations,
      },
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

exports.newInviteCode = async (req, res, next) => {
  try {
    const { body: payload } = req;

    const checkEmailExists = await req.db.Users.findOne({
      email: payload.email,
    });

    if (checkEmailExists !== null) {
      throw new ErrorWithStatusCode('Email is already registered.', StatusCodes.BAD_REQUEST);
    }

    const now = new Date();
    const expirationDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2, 23, 59, 59);

    const inviteCode = {
      role: payload.role,
      linkedToEmail: payload.email,
      code: uuidv4(),
      activeUntil: expirationDate,
    };

    const newInvite = new req.db.InviteCodes(inviteCode);
    await newInvite.save()
      .catch((err) => {
        switch (err.code) {
          case 11000:
            throw new ErrorWithStatusCode('Invite code already exists. Try again the request.');
          case 211:
            throw new ErrorWithStatusCode('There was an issue with our database. Try again.');
          case 11600:
            throw new ErrorWithStatusCode('There was an issue with our database. Try again.');
          default:
            throw new ErrorWithStatusCode('There was a problem with the request. Try again.');
        }
      });

    // TODO: Send an email to the user with the invite code.

    res.locals = {
      message: 'Invite code successfully generated.',
      data: {
        email: inviteCode.linkedToEmail,
        code: inviteCode.code,
        activeUntil: expirationDate,
      },
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

exports.getUser = async (req, res, next) => {
  try {
    LOG_DEBUG('Auth me');

    // fr0gfkeDAlWe9taqSM2iz0uJenj1
    // getAuth()
    //   .getUser('fr0gfkeDAlWe9taqSM2iz0uJenj1')
    //   .then((userRecord) => {
    //     // See the UserRecord reference doc for the contents of userRecord.
    //     // console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
    //     // console.log(userRecord)
    //   })
    //   .catch((error) => {
    //     console.log('Error fetching user data:', error);
    //   });
    const user = await req.db.Users.findOne({
      username: res.locals.tokenData.username,
    }, {
      password: 0,
      __v: 0,
    });

    if (user === null) {
      throw new ErrorWithStatusCode('Failed to find the current user by username.', StatusCodes.NOT_FOUND);
    }

    res.locals = {
      message: 'User fetched successfully.',
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
