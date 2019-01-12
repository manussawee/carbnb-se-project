const CarData = require('./car-data');

const getCarByCondition = async ({ query }, res, isAdmin = false) => {
  const { error, response } = await CarData.getCar(query, isAdmin);
  if (error) {
    res.status(400).send({ msg: `error: ${error}` });
  }
  res.send(response);
};


const getCarByUserId = async (req, res) => {
  // eslint-disable-next-line
  const { error, response } = await CarData.getCar({ user_id: req.user._id });
  if (error) {
    res.status(400).send({ msg: `error: ${error}` });
  }
  res.send(response);
};

const createCar = async (req, res) => {
  const {
    user: { _id },
    body: {
      type,
      title,
      description,
      status,
      price,
      location,
      availableType,
      startDate,
      endDate,
      days,
      images,
    },
  } = req;
  const { error, response } = await CarData.createCar({
    user_id: _id,
    type,
    title,
    description,
    status,
    price,
    location,
    available_type: availableType,
  }, {
    startDate,
    endDate,
    days,
  }, images);
  if (error) {
    res.status(400).send({ msg: `error: ${error}` });
  }
  res.send({ msg: 'success', id: response });
};

const deleteCar = async (req, res) => {
  const { error, response } = await CarData.deleteCar(req);
  if (error) {
    res.status(400).send({ msg: `error: ${error}` });
  }
  res.send({ msg: 'success', id: response });
};

const editCar = async (req, res) => {
  const {
    user: { _id },
    body: {
      type,
      title,
      description,
      price,
      location,
      availableType,
      startDate,
      endDate,
      days,
      images,
    },
    params: { id },
  } = req;
  const { error } = await CarData.editCarById(id, {
    user_id: _id,
    type,
    title,
    description,
    price,
    location,
    available_type: availableType,
  }, {
    startDate,
    endDate,
    days,
  }, images);
  if (error) {
    res.status(400).send({ msg: `error: ${error}` });
  }
  res.send({ msg: 'success' });
};

module.exports = {
  getCarByUserId,
  createCar,
  deleteCar,
  editCar,
  getCarByCondition,
};
