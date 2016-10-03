"use strict";
var express_1 = require('express');
var auth_1 = require('./auth');
exports.apiRoutes = express_1.Router()
    .use('/auth', auth_1.authRoutes);
