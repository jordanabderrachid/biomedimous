'use strict';

require('dotenv').config();

var aws = require('aws-sdk');
var bodyParser = require('body-parser');
var express = require('express');

var logger = require('./src/utils').logger;

if (process.env.NODE_ENV === 'local') {
  logger.info('configuring aws sdk for local environment');
  aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  });
}

var apiRoutes = require('./src/routes/api');

var app = express();

app.use(express.static('public'));
app.use(bodyParser.json());

app.use('/api', apiRoutes);

app.listen(process.env.PORT, function() {
  logger.info('server running on %s:%d', 'localhost', process.env.PORT);
});
