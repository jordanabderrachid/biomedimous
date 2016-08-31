'use strict';

var apiRoutes = require('express').Router();

var authRoutes = require('./auth');

apiRoutes.use('/auth', authRoutes);

module.exports = apiRoutes;
