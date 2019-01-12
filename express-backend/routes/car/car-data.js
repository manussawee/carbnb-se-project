// TODO: resolve this file!
/* eslint-disable */
const moment = require('moment');
const Car = require('../model/cars');
const ManualAvailable = require('../model/manual-available');
const RepeatAvailable = require('../model/repeat-available');
const CarImage = require('../model/car-images');
const Rental = require('../model/rentals');


const compareDays = (requestedDates, Dates) => {
  for (let i = 0; i < 7; i += 1) {
    if (requestedDates[i] == true && Dates[i] != true) return false;
  }
  return true;
} 
const getCar = async ({ type, location, startDate, endDate, _id, user_id }, isAdmin = false) => {
  const formattedStartDate = moment(startDate).add(1, 'seconds');
  const formattedEndDate = moment(endDate).add(-1, 'seconds');
  let requestedDates = [0, 0, 0, 0, 0, 0, 0];
  for (let date = moment(startDate); date.isBefore(moment(endDate).add(1, 'seconds')); date = date.add(1, 'days')) {
    const weekDay = date.day();
    requestedDates[weekDay] = true;
  }
  let error, response
  let filter = {};
  if (type) filter.type = type;
  if (location) filter.location = location;
  if (_id) filter._id = _id;
  if (user_id) filter.user_id = user_id; 
  if (!isAdmin) filter.is_banned = false; 
  try {
    response = await Car.find({ ...filter }).populate('manual_available_id').populate('repeat_available_id').populate('car_image_ids').populate('user_id');
    if (startDate && endDate) {
      response = response.filter(
        car => car.available_type === 'period' ? car.manual_available_id 
        && formattedStartDate.isAfter(car.manual_available_id.started_at)
        && formattedEndDate.isBefore(car.manual_available_id.ended_at)
        : compareDays(requestedDates, car.repeat_available_id.days)
      );
    }
  } catch (e) {
    error = e
  }
  return { error, response }
}

const createCar = async(body, availble, images) => {
  let error, response, manual_available_id, repeat_available_id;
  try {
    if (body.available_type === 'period') {
      const manualAvailableModel = new ManualAvailable({
        started_at: availble.startDate,
        ended_at: availble.endDate,
      });
      const { _id } = await manualAvailableModel.save();
      manual_available_id = _id;
    } else {
      const RepeatAvailableModel = new RepeatAvailable({
        days: availble.days,
      });
      const { _id } = await RepeatAvailableModel.save();
      repeat_available_id = _id;
    }
    
    const imageList = images.map(image => ({
      image_url: image,
      alt: body.title,
    }));
    const car_image_ids = await CarImage.insertMany(imageList)

    const status = 'available';

    const carModel = new Car({ ...body, status, manual_available_id, repeat_available_id, car_image_ids });
    response = await carModel.save()
  } catch (e) {
    error = e
  }
  return { error, response }
}

const deleteCar = async({ params }) => {
  let error, response
  try {
    const result = await Rental.find({ car_id: params.id, status: { $ne: 'returned' } });
    if (result.length > 0) {
      error = 'Cannot remove this car'
    } else {
      response = await Car.findOneAndRemove({ _id: params.id });
      if (!response) 
        error = 'User not found ' + params.id
    }
  } catch (err) {
    error = 'Unknown server error when trying to delete user with id ' + params.id;
  }
  return { error, response }
}

const editCarById = async (id, body, availble, images) => {
  let error, response, manual_available_id, repeat_available_id
  try {
    if (body.available_type === 'period') {
      const manualAvailableModel = new ManualAvailable({
        started_at: availble.startDate,
        ended_at: availble.endDate,
      });
      const { _id } = await manualAvailableModel.save();
      manual_available_id = _id;
    } else {
      const RepeatAvailableModel = new RepeatAvailable({
        days: availble.days,
      });
      const { _id } = await RepeatAvailableModel.save();
      repeat_available_id = _id;
    }

    const imageList = images.map(image => ({
      image_url: image,
      alt: body.title,
    }));
    const car_image_ids = await CarImage.insertMany(imageList)

    response = await Car.findOneAndUpdate({_id: id }, { ...body, manual_available_id, repeat_available_id, car_image_ids }, {new: true});
    if (!response) {
      error = 'User not found ' + params.id
    }
    } catch (err) {
    error = 'Unknown server error when trying to update user with id ' + params.id;
    }
    return {error, response}
}

module.exports = {
  getCar,
  createCar,
  deleteCar,
  editCarById
}
