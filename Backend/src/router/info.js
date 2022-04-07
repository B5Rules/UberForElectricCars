const router = require('express').Router();
const { information } = require('controllers');

router.get(
  '/',
  information.info,
);

module.exports = router;
