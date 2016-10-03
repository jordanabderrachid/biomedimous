"use strict";
var express_1 = require('express');
var authController = require('../controllers/auth');
exports.authRoutes = express_1.Router()
    .put('/', authController.createUser);
