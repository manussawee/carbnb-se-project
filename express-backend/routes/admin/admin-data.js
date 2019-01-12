const User = require('../model/users');
const Car = require('../model/cars');

const getUser = async (params) => {
  let error;
  let response;
  try {
    response = await User.find(params);
  } catch (e) {
    error = e;
  }
  return { error, response };
};

const banUserById = async (id, isBanned = true) => {
  let error;
  let response;
  try {
    const cars = await Car.find({ user_id: id });
    cars.map(async ({ _id }) => {
      await Car.findOneAndUpdate({ _id }, { is_banned: isBanned }, { new: true });
    });
    response = await User.findOneAndUpdate({
      _id: id,
    },
    {
      is_banned: isBanned,
    },
    {
      new: true,
    });
  } catch (e) {
    error = e;
  }
  return { error, response };
};

module.exports = {
  getUser,
  banUserById,
};
