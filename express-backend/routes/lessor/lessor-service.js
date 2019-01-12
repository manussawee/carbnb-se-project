const LessorData = require('./lessor-data');
const RentalData = require('../rental/rental-data');
const RentalService = require('../rental/rental-service');
const Car = require('../model/cars');
const Rental = require('../model/rentals');

const getRental = async (req, res) => {
  const { user: { _id } } = req;
  const { error, response } = await LessorData.getRental({
    lessor_id: _id,
  });
  if (error) {
    res.status(400).send({ msg: `error: ${error}` });
  }
  res.send({ rentalList: response });
};

const rentalRetrieval = async (req, res) => {
  const { user: { _id }, params: { id } } = req;
  const { error, response } = await RentalData.getRental({ lessor_id: _id, _id: id });
  if (error) {
    res.status(400).send({ msg: `error: ${error}` });
  }
  if (response.length === 0) res.send({ msg: 'no rental' });
  // eslint-disable-next-line camelcase
  const { lessee_id, lessor_id, status } = response[0];
  if (status === 'retrieving') {
    const { errorRental, responseLessor } = await LessorData.editRental({ lessor_id: _id, _id: id },
      { status: 'retrieved', updated_at: new Date() });
    const rental = await Rental.findOne({ _id: id });
    const car = await Car.findOne({ _id: rental.car_id });
    car.status = 'rented';
    await car.save();
    if (errorRental) {
      res.status(400).send({ msg: `error: ${errorRental}` });
    }
    await RentalService.sendNotification(lessee_id, lessor_id, responseLessor);
    res.send(responseLessor);
  } else res.send({ msg: 'wrong status' });
};

const rentalReturn = async (req, res) => {
  const { user: { _id }, params: { id } } = req;
  const { error, response } = await RentalData.getRental({ lessor_id: _id, _id: id });
  if (error) {
    res.status(400).send({ msg: `error: ${error}` });
  }
  if (response.length === 0) res.send({ msg: 'no rental' });
  // eslint-disable-next-line camelcase
  const { lessee_id, lessor_id, status } = response[0];
  if (status === 'returning') {
    const { errorRental, responseLessor } = await LessorData.editRental({ lessor_id: _id, _id: id },
      { status: 'returned', updated_at: new Date() });
    const rental = await Rental.findOne({ _id: id });
    const car = await Car.findOne({ _id: rental.car_id });
    car.status = 'available';
    await car.save();
    if (errorRental) {
      res.status(400).send({ msg: `error: ${errorRental}` });
    }
    await RentalService.sendNotification(lessee_id, lessor_id, responseLessor);
    res.send(responseLessor);
  } else res.send({ msg: 'wrong status' });
};

module.exports = {
  getRental,
  rentalRetrieval,
  rentalReturn,
};
