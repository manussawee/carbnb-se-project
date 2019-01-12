// TODO: resolve this file!
/* eslint-disable */
const express = require('express');
const router = express.Router();
const User = require('../model/users');
const Lessee = require('../lessee/lessee-data');
const Car = require('../car/car-data');

const getUser = async (id) => {
    let error, response
    try {
        const userResponse = await User.findOne({ _id: id });
        const rentalResponse = await Lessee.getRental({ lessee_id: id });
        const carResponse = await Car.getCar({ user_id: id });
        response = {
            user: userResponse,
            rentals: rentalResponse.response,
            cars: carResponse.response,
        };
    } catch (e) {
        error = e
    }
    return { error, response }
}
const createUser = async({ body }) => {
    let error, response
    const UserModel = new User(body);
    
    try {
        response = await UserModel.save()
    } catch (e) {
        error = e
    }
    return { error, response }
}

const deleteUser = async({ params }) => {
    let error, response
    try {
        response = await User.findOneAndRemove({_id: params.id });
        if (!response) 
            error = 'User not found ' + params.id
    } catch (err) {
        error = 'Unknown server error when trying to delete user with id ' + params.id;
    }
    return { error, response }
}

const editUser = async (id, body) => {
    let error, response
    console.log(body)
    try {
        response = await User.findOneAndUpdate({ _id: id }, body, { new: true });
        if (!response) {
            error = 'User not found ' + params.id
        }
      } catch (err) {
        error = 'Unknown server error when trying to update user with id ' + params.id;
      }
      return {error, response}
}

module.exports = {
    getUser,
    createUser,
    deleteUser,
    editUser
}
