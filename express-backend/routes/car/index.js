const express = require('express');
const passport = require('../auth/passport');

const router = express.Router();
const CarService = require('./car-service');

router.get('/', passport.authenticate('jwt'), CarService.getCarByUserId);

router.post('/', passport.authenticate('jwt'), CarService.createCar);

router.delete('/:id', passport.authenticate('jwt'), CarService.deleteCar);

router.put('/:id', passport.authenticate('jwt'), CarService.editCar);

module.exports = router;
