'use strict';

var authRoutes = require('express').Router();

var authController = require('../controllers/auth');

authRoutes.put('/', authController.createUser);
authRoutes.post('/', authController.authenticateUser);

module.exports = authRoutes;
