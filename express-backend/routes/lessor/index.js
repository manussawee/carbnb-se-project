const express = require('express');

const router = express.Router();
const CarService = require('../car');
const passport = require('../auth/passport');
const LessorService = require('./lessor-service');

router.use('/car', CarService);
router.get('/rental', passport.authenticate('jwt'), LessorService.getRental);
router.put('/rental/retrieval/:id', passport.authenticate('jwt'), LessorService.rentalRetrieval);
router.put('/rental/return/:id', passport.authenticate('jwt'), LessorService.rentalReturn);
module.exports = router;
