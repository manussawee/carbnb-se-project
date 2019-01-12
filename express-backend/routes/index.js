const express = require('express');

const router = express.Router();
const auth = require('./auth/router');
const rental = require('./rental');
const lessor = require('./lessor');
const user = require('./user');
const passport = require('./auth/passport');
const lessee = require('./lessee');
const admin = require('./admin');

router.use(passport.initialize());
router.use('/auth', auth);
router.use('/rental', rental);
router.use('/lessor', lessor);
router.use('/user', user);
router.use('/lessee', lessee);
router.use('/admin', admin);

router.get('/', (req, res) => {
  res.send('Hello It\'s Backend');
});
module.exports = router;
