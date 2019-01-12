const express = require('express');
const passport = require('../auth/passport');

const router = express.Router();
const LesseeService = require('./lessee-service');
const CarService = require('../car/car-service');

router.get('/rental/history', passport.authenticate('jwt'), LesseeService.getRentalHistory);
router.get('/rental', passport.authenticate('jwt'), LesseeService.getRental);
router.delete('/rental/cancel/:id', passport.authenticate('jwt'), LesseeService.cancelRental);
router.post('/rental/request', passport.authenticate('jwt'), LesseeService.createRental);
router.put('/rental/retrieval/:id', passport.authenticate('jwt'), LesseeService.rentalRetrieval);
router.put('/rental/return/:id', passport.authenticate('jwt'), LesseeService.rentalReturn);
router.get('/car', CarService.getCarByCondition);
// router.get('/socket', LesseeService.testSocket);

module.exports = router;
