// TODO: resolve this file!
/* eslint-disable */
const express = require('express');
const router = express.Router();
const Rental = require('../model/rentals');

const getRentalWithDetail = async (params) => {
    let error, response
    try {
        response = await Rental.find(params).populate('car_id').populate('lessor_id').populate('lessee_id');
    } catch (e) {
        error = e
    }
    return { error, response }
}

const getRental = async (params) => {
    let error, response
    try {
        response = await Rental.find(params)
    } catch (e) {
        error = e
    }
    return { error, response }
}

const createRental = async ({ query, body }) => {
    const {
        data: dataString,
        successUrl,
        // errorUrl,
    } = query;
    const data = JSON.parse(dataString);
    let error, response;

    // add condition here

    const rentalModel = new Rental({
        ...data,
        status: 'waiting_retrieving',
        payment_ref: body.payment_ref,
    });
    try {
        await rentalModel.save()
        response = { redirectUrl: successUrl };
    } catch (e) {
        error = e
    }
    return { error, response }
}

const deleteRental = async (params) => {
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
    let error, response
    try {
        response = await Rental.findOneAndUpdate(params, body, {new: true});
        if (!response) {
            error = 'Renatl not found '
        }
      } catch (err) {
        error = 'Unknown server error when trying to update user with id '
      }
      return {error, response}
}

module.exports = {
    getRental,
    createRental,
    deleteRental,
    getRentalWithDetail,
    editRental,
}
