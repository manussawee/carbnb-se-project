const passport = require('passport');
const passportJWT = require('passport-jwt');

const User = require('../model/users');
const jwtConfig = require('../../config').auth.jwt;

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;


// TODO: use asymmetric key instead of silly base64 that decodes to a joke.
passport.use(
  'jwt',
  new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtConfig.key,
    issuer: jwtConfig.issuer,
    audience: jwtConfig.audience,
  }, (jwtPayload, done) => {
    const { username } = jwtPayload;
    User.findOne({ username })
      .then((user) => {
        if (!user) {
          done(null, false, 'user not found');
        } else if (user.is_banned === true) {
          done(null, false, 'user is banned');
        } else {
          done(null, user);
        }
      }).catch((err) => {
        done(err);
      });
  }),
);

passport.use(
  'jwt-admin',
  new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtConfig.key,
    issuer: jwtConfig.issuer,
    audience: jwtConfig.audience,
  }, (jwtPayload, done) => {
    const { username } = jwtPayload;
    User.findOne({ username })
      .then((user) => {
        if (!user) {
          done(null, false, 'user not found');
        } else if (user.is_banned === true) {
          done(null, false, 'user is banned');
        } else if (user.role !== 'Admin') {
          done(null, false, 'user is not an admin');
        } else {
          done(null, user);
        }
      })
      .catch((err) => {
        done(err);
      });
  }),
);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

module.exports = passport;
