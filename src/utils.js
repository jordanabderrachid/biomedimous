'use strict';

var winston = require('winston');

var logger = function() {
  return new winston.Logger({
    level: 'debug',
    transports: [new (winston.transports.Console)({timestamp: true})]
  });
};

module.exports = {
  logger: logger()
};
