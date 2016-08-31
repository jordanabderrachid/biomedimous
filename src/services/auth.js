'use strict';

var logger = require('../utils').logger;

var userModel = require('../models/user');

var authService = {};

/**
 * Create a user.
 *
 * @param {Object} user - the user to create
 * @param {String} user.email - the email of the user
 * @param {String} user.password - the password of the user
 * @param {Function} cb - the callback function
 */
authService.createUser = function(user, cb) {
  logger.debug('auth-service: creating user', {email: user.email, password: user.password});

  var userToStore = userModel.createUser(user.email, user.password);
  logger.debug('auth-service: storing user', {user: userToStore});

  userModel.save(userToStore, cb);
};

/**
 * Authenticate a user.
 *
 * @param {Object} user - the user to authenticate
 * @param {String} user.email - the email of the user
 * @param {String} user.password - the password of the user
 * @param {Function} cb - the callback function
 */
authService.authenticateUser = function(user, cb) {
  logger.debug('auth-service: authenticating user', {email: user.email, password: user.password});
  process.nextTick(cb);
};

module.exports = authService;
