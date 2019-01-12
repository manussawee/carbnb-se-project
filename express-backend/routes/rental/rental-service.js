const RentalData = require('./rental-data');

const getRental = async (req, res) => {
  const { error, response } = await RentalData.getRental(req);
  if (error) {
    res.status(400).send({ msg: `error: ${error}` });
  }
  res.send(response);
};

const getRentalForSearch = async ({ query }, res) => {
  const { error, response } = await RentalData.getRental(query);
  if (error) {
    res.status(400).send({ msg: `error: ${error}` });
  }
  res.send(response);
};


const createRental = async (req, res) => {
  const { error, response } = await RentalData.createRental(req);
  if (error) {
    res.status(400).send({ msg: `error: ${error}` });
  }
  res.redirect(response.redirectUrl);
};

const deleteRental = async (req, res) => {
  const { error, response } = await RentalData.deleteRental({ _id: req.params.id });
  if (error) {
    res.status(400).send({ msg: `error: ${error}` });
  }
  res.send({ msg: 'success', id: response });
};

const editRental = async (req, res) => {
  const { error } = await RentalData.editRental(req);
  if (error) {
    res.status(400).send({ msg: `error: ${error}` });
  }
  res.send({ msg: 'success' });
};

const sendNotification = async (lessee, lessor, status) => {
  // eslint-disable-next-line no-undef
  io.sockets.emit(lessee, status);
  // eslint-disable-next-line no-undef
  io.sockets.emit(lessor, status);
};

module.exports = {
  getRental,
  createRental,
  deleteRental,
  editRental,
  sendNotification,
  getRentalForSearch,
};
