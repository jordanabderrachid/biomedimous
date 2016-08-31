'use strict';

var aws = require('aws-sdk');

var config = require('../config');
var logger = require('../utils').logger;

var dynamodb;

var createInstance = function() {
  logger.info('DynamoDB: using version %s and region %s',
    config.DYNAMODB.VERSION, config.DYNAMODB.REGION);

  return new aws.DynamoDB({
    apiVersion: config.DYNAMODB.VERSION,
    region: config.DYNAMODB.REGION
  });
};

var getInstance = function() {
  if (typeof dynamodb === 'undefined') {
    dynamodb = createInstance();
  }

  return dynamodb;
};

module.exports = getInstance();
