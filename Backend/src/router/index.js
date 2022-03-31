const router = require('express').Router();
const info = require('./info');

router.use('/info', info);

module.exports = router;
