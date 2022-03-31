const router = require('express').Router();
const users = require('./users');
const info = require('./info');
const auth = require('./auth');

router.use('/user', users);
router.use('/info', info);
router.use('/auth', auth);

module.exports = router;
