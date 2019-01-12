// TODO: resolve this file!
/* eslint-disable */
const express = require('express');
const router = express.Router();
const Rental = require('../model/rentals');
const Car = require('../model/cars');

const getRental = async(params) => {
    //Car status, Rental status
    let error, response
    try {
        response = await Rental.find(params)
            .populate({
                path: 'car_id',
                populate: { path: 'car_image_ids' },
            })
            .populate('lessor_id')
            .populate('lessee_id');
    } catch (e) {
        error = e
    }
    return { error, response }
}
const createRental = async(params) => {
    let error, response
    const rentalModel = new Rental(params);
    try {
        response = await rentalModel.save()
    } catch (e) {
        error = e
    }
    return { error, response }
}

const deleteRental = async(params) => {
    let error, response
    try {
        response = await Rental.findOneAndRemove(params);
        if (!response) 
            error = 'Rental not found '
    } catch (err) {
        error = 'Unknown server error when trying to delete user with id '
    }
    return { error, response }
}

const editRental = async (params, body) => {
    let errorRental, responseLessee
    try {
        responseLessee = await Rental.findOneAndUpdate(params, body, {new: true})
            .populate({
                path: 'car_id',
                populate: { path: 'car_image_ids' },
            })
            .populate('lessor_id')
            .populate('lessee_id');
        if (!responseLessee) {
            errorRental = 'Renatl not found '
        }
      } catch (err) {
        errorRental = 'Unknown server error when trying to update user with id '
      }
      return { errorRental, responseLessee }
}

module.exports = {
    getRental,
    createRental,
    deleteRental,
    editRental,
}
