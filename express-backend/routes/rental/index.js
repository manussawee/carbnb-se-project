const express = require('express');

const router = express.Router();
const RentalService = require('./rental-service');

router.get('/', RentalService.getRental);

router.get('/search', RentalService.getRentalForSearch);

router.post('/', RentalService.createRental);

router.delete('/:id', RentalService.deleteRental);

router.put('/:id', RentalService.editRental);

module.exports = router;
