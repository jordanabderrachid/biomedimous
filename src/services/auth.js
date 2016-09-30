'use strict';

var logger = require('../utils').logger;

var userModel = require('../models/user');
var tokenStore = require('../stores/token');

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
  logger.debug('auth-service', {
    process: 'creatingUser',
    email: user.email,
    password: user.password
  });

  var userToStore = userModel.createUser(user.email, user.password);
  logger.debug('auth-service', {
    process: 'storingUser',
    user: userToStore
  });

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
  logger.debug('auth-service', {
    process: 'authenticateUser',
    result: 'started',
    email: user.email,
    password: user.password
  });

  userModel.getUser(user.email, function(err, foundUser) {
    if (err || !foundUser) {
      cb(new Error('auth-service: fail to get user'));
      return;
    }

    userModel.verifyPassword(foundUser, user.password, function(err, passwordCorrect) {
      if (err || !passwordCorrect) {
        cb(new Error('auth-service: invalid password'));
        return;
      }

      tokenStore.addUser(foundUser, function(err, token) {
        if (err) {
          cb(err);
          return;
        }

        logger.debug('auth-service', {
          process: 'authenticateUser',
          result: 'success',
          email: user.email,
          password: user.password
        });
        cb(null, token);
      });
    });
  });
};

module.exports = authService;
