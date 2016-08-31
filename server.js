'use strict';

require('dotenv').config();

var bodyParser = require('body-parser');
var express = require('express');

var apiRoutes = require('./src/routes/api');

var logger = require('./src/utils').logger;

var app = express();

app.use(express.static('public'));
app.use(bodyParser.json());

app.use('/api', apiRoutes);

app.listen(process.env.PORT, function() {
  logger.info('server running on %s:%d', 'localhost', process.env.PORT);
});
