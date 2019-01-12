const LesseeData = require('./lessee-data');
const RentalData = require('../rental/rental-data');
const RentalService = require('../rental/rental-service');

const getRentalHistory = async (req, res) => {
  const { user: { _id } } = req;
  const { error, response } = await LesseeData.getRental({ lessee_id: _id, status: 'returned' });
  if (error) {
    res.status(400).send({ msg: `error: ${error}` });
  }
  res.send({ rentalList: response });
};

const getRental = async (req, res) => {
  const { user: { _id } } = req;
  const { error, response } = await LesseeData.getRental({
    lessee_id: _id,
    status: {
      $ne: 'returned',
    },
  });
  if (error) {
    res.status(400).send({ msg: `error: ${error}` });
  }
  res.send({ rentalList: response });
};

const cancelRental = async (req, res) => {
  const { user: { _id }, params: { id } } = req;
  const { error, response } = await LesseeData.deleteRental({ lessee_id: _id, car_id: id });
  if (error) {
    res.status(400).send({ msg: `error: ${error}` });
  }
  res.send({ deleteRental: response });
};

const createRental = async (req, res) => {
  const {
    user: { _id },
    body: {
      lessorId,
      carId,
      startedAt,
      endedAt,
      status,
      paymentRef,
    },
  } = req;
  const query = {
    lessee_id: _id,
    lessor_id: lessorId,
    car_id: carId,
    started_at: startedAt,
    ended_at: endedAt,
    status,
    payment_ref: paymentRef,
  };
  const { error, response } = await LesseeData.createRental(query);
  if (error) {
    res.status(400).send({ msg: `error: ${error}` });
  }
  res.send({ msg: 'success', id: response });
};

const rentalRetrieval = async (req, res) => {
  const { user: { _id }, params: { id } } = req;
  const { error, response } = await RentalData.getRental({ lessee_id: _id, _id: id });
  if (error) {
    res.status(400).send({ msg: `error: ${error}` });
  }
  if (response.length === 0) res.send({ msg: 'no rental' });
  // eslint-disable-next-line camelcase
  const { lessee_id, lessor_id, status } = response[0];
  if (status === 'waiting_retrieving') {
    const { errorRental, responseLessee } = await LesseeData.editRental({ lessee_id: _id, _id: id },
      { status: 'retrieving', updated_at: new Date() });
    if (errorRental) {
      res.status(400).send({ msg: `error: ${errorRental}` });
    }
    await RentalService.sendNotification(lessee_id, lessor_id, responseLessee);
    res.send(responseLessee);
  } else res.send({ msg: 'wrong status' });
};

const rentalReturn = async (req, res) => {
  const { user: { _id }, params: { id } } = req;
  const { error, response } = await RentalData.getRental({ lessee_id: _id, _id: id });
  if (error) {
    res.status(400).send({ msg: `error: ${error}` });
  }
  if (response.length === 0) res.send({ msg: 'no rental' });
  // eslint-disable-next-line camelcase
  const { lessee_id, lessor_id, status } = response[0];
  if (status === 'retrieved') {
    const { errorRental, responseLessee } = await LesseeData.editRental({ lessee_id: _id, _id: id },
      { status: 'returning', updated_at: new Date() });
    if (errorRental) {
      res.status(400).send({ msg: `error: ${errorRental}` });
    }
    await RentalService.sendNotification(lessee_id, lessor_id, responseLessee);
    res.send(responseLessee);
  } else res.send({ msg: 'wrong status' });
};

// const testSocket = async (req, res) => {
//   console.log('Send OK');
//   io.sockets.emit('5bf61909b813c69257f44c87', 'hello1');
//   // io.sockets.emit('hello2', 'hello1');
//   res.send({ msg: 'ok' });
// };

module.exports = {
  getRentalHistory,
  getRental,
  cancelRental,
  createRental,
  rentalRetrieval,
  rentalReturn,
  // testSocket,
};
