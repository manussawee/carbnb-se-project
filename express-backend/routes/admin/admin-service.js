const AdminData = require('./admin-data');
const RentalData = require('../rental/rental-data');

const getRental = async ({ query }, res) => {
  const { error, response } = await RentalData.getRentalWithDetail(query);
  if (error) {
    res.status(400).send({ msg: `error: ${error}` });
  }
  res.send(response);
};

const getUser = async ({ query, user: { _id: id } }, res) => {
  const { error, response } = await AdminData.getUser({ _id: { $ne: id }, ...query });
  if (error) {
    res.status(400).send({ msg: `error: ${error}` });
  }
  res.send(response);
};

const banUser = async ({ params: { id } }, res) => {
  const { error, response } = await AdminData.banUserById(id, true);
  if (error) {
    res.status(400).send({ msg: `error: ${error}` });
  }
  res.send(response);
};

const unbanUser = async ({ params: { id } }, res) => {
  const { error, response } = await AdminData.banUserById(id, false);
  if (error) {
    res.status(400).send({ msg: `error: ${error}` });
  }
  res.send(response);
};

module.exports = {
  getRental,
  getUser,
  banUser,
  unbanUser,
};
