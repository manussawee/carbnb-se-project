import {
  post, get, delete as remove, put,
} from 'axios';

import config from '../config';

export function login(email, password) {
  return post(`${config.backendAPI}/auth`, {
    username: email,
    password,
  }).then(response => response.data);
}

export function register(email, password, fullname) {
  return post(`${config.backendAPI}/auth/register`, {
    username: email,
    password,
    fullname,
  }).then(response => response.data);
}

export function addCar(carBody, headers) {
  return post(`${config.backendAPI}/lessor/car`, carBody, headers).then(response => response.data);
}

export function getRental() {
  return get(`${config.backendAPI}/lessor/rental`).then(response => response.data);
}

export function getCarInfo(carId) {
  return get(`${config.backendAPI}/lessee/car?_id=${carId}`).then(response => response.data);
}

export function getMyCar(headers) {
  return get(`${config.backendAPI}/lessor/car`, headers).then(response => response.data);
}

export function searchCar(params) {
  return get(`${config.backendAPI}/lessee/car?${params}`).then(response => response.data);
}

export function removeCar(id, headers) {
  return remove(`${config.backendAPI}/lessor/car/${id}`, headers).then(response => response.data);
}

export function editCar(id, body, headers) {
  return put(`${config.backendAPI}/lessor/car/${id}`, body, headers).then(
    response => response.data,
  );
}

export function terminateRental(id, headers) {
  return remove(`${config.backendAPI}/rental/${id}`, headers).then(response => response.data);
}

export function getLesseeRental(headers) {
  return get(`${config.backendAPI}/lessee/rental`, headers).then(response => response.data);
}

export function getLesseeRentalHistory(headers) {
  return get(`${config.backendAPI}/lessee/rental/history`, headers).then(response => response.data);
}

export function retrieveLesseeRental(id, headers) {
  return put(`${config.backendAPI}/lessee/rental/retrieval/${id}`, {}, headers).then(
    response => response.data,
  );
}

export function returnLesseeRental(id, headers) {
  return put(`${config.backendAPI}/lessee/rental/return/${id}`, {}, headers).then(
    response => response.data,
  );
}

export function getLessorRental(headers) {
  return get(`${config.backendAPI}/lessor/rental`, headers).then(response => response.data);
}

export function retrieveLessorRental(id, headers) {
  return put(`${config.backendAPI}/lessor/rental/retrieval/${id}`, {}, headers).then(
    response => response.data,
  );
}

export function returnLessorRental(id, headers) {
  return put(`${config.backendAPI}/lessor/rental/return/${id}`, {}, headers).then(
    response => response.data,
  );
}

export function getAllRental() {
  return get(`${config.backendAPI}/rental/search`).then(response => response.data);
}

export function getUser(id, headers) {
  return get(`${config.backendAPI}/user/${id}`, headers).then(response => response.data);
}

export function updateUser(data, headers) {
  return put(`${config.backendAPI}/user`, data, headers).then(response => response.data);
}

export function getAllUsers(headers) {
  return get(`${config.backendAPI}/admin/user`, headers).then(response => response.data);
}

export function getAllCars(headers) {
  return get(`${config.backendAPI}/admin/car`, headers).then(response => response.data);
}

export function getAllRentals(headers) {
  return get(`${config.backendAPI}/admin/rental`, headers).then(response => response.data);
}

export function banUser(id, headers) {
  return get(`${config.backendAPI}/admin/user/${id}/ban`, headers).then(response => response.data);
}

export function unBanUser(id, headers) {
  return get(`${config.backendAPI}/admin/user/${id}/unban`, headers).then(response => response.data);
}

export function mockLogin(email, password) {
  return new Promise(resolve => setTimeout(resolve, 1000)).then(() => ({
    token: email,
    role: password,
  }));
}
