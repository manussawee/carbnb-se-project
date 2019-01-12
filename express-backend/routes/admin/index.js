const express = require('express');
const passport = require('../auth/passport');

const router = express.Router();
const AdminService = require('./admin-service');
const CarService = require('../car/car-service');

router.get('/rental', passport.authenticate('jwt-admin'), AdminService.getRental);
router.get('/user', passport.authenticate('jwt-admin'), AdminService.getUser);
router.get('/user/:id/ban', passport.authenticate('jwt-admin'), AdminService.banUser);
router.get('/user/:id/unban', passport.authenticate('jwt-admin'), AdminService.unbanUser);
router.get('/car', passport.authenticate('jwt-admin'), (req, res) => CarService.getCarByCondition(req, res, true));

module.exports = router;
