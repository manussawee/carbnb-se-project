const express = require('express');
const jwt = require('jsonwebtoken');

const passport = require('./passport');
const User = require('../model/users');

const jwtKey = require('../../config').auth.jwt.key;

const router = express.Router();

// TODO: implement a proper way to register an admin
router.post('/register', (req, res, next) => {
  const {
    username,
    password,
    passcode,
    fullname,
  } = req.body;
  const role = passcode === 'letmebeadmin' ? 'Admin' : 'User';
  User.register(new User({ username, role, fullname }), password, (err) => {
    if (err) {
      console.log('register ERROR', err);
      return next(err);
    }
    const successMsg = `register${role === 'Admin' ? ' as admin' : ''} SUCCESS`;
    console.log(successMsg, req.body.username);
    return res.send(successMsg);
  });
});

router.post('/', passport.authenticate('local'), (req, res) => {
  const token = jwt.sign({ username: req.user.username }, jwtKey, {
    issuer: 'carbnb.com',
    audience: 'carbnb.com',
  });
  if (req.user.is_banned) {
    res.status(401).send({ msg: 'Your account has been banned' });
  }
  res.json({
    token,
    role: req.user.role,
    fullname: req.user.fullname,
    email: req.user.username,
    // eslint-disable-next-line
    id: req.user._id,
  });
});

router.post(
  '/testjwt',
  passport.authenticate('jwt', { session: false, successRedirect: 'authSuccess', failureRedirect: 'authFailure' }),
);

router.post(
  '/testjwt-admin',
  passport.authenticate('jwt-admin', { session: false, successRedirect: 'authSuccess', failureRedirect: 'authFailure' }),
);

router.get('/authSuccess', (req, res) => { res.send('auth success'); });
router.get('/authFailure', (req, res) => { res.status(401).send('auth failed'); });

module.exports = router;
