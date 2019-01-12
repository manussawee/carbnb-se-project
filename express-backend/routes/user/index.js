const express = require('express');
const passport = require('passport');

const router = express.Router();
const UserService = require('./user-service');

router.get('/:id', UserService.getUser);

router.post('/:id', UserService.createUser);

router.delete('/:id', UserService.deleteUser);

router.put('/', passport.authenticate('jwt'), UserService.editUser);

module.exports = router;
