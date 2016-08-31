'use strict';

var crypto = require('crypto');

var dynamodbMarshaler = require('dynamodb-marshaler');

var dynamodb = require('../providers/dynamodb');

var SALT_SIZE_IN_BYTES = 32; // bytes
var SALT_DIGEST_TYPE = 'hex';

var HASH_TYPE = 'sha256';
var HASH_DIGEST_TYPE = 'hex';

var USER_TABLE_NAME = 'biomedimous-users';

var userModel = {};

userModel.USER_TYPES = {
  USER: 'USER',
  MODERATOR: 'MODERATOR'
};

/**
 * Create a new user model, it creates a salt, hash the password and set the
 * user type.
 *
 * @param {String} email - the email of the user
 * @param {String} password - the password of the user
 */
userModel.createUser = function(email, password) {
  // TODO Use crypto asynchronous functions
  var salt = crypto.randomBytes(SALT_SIZE_IN_BYTES).toString(SALT_DIGEST_TYPE);

  var passwordSalted = password + salt;

  var hasher = crypto.createHash(HASH_TYPE);
  hasher.update(passwordSalted);

  var passwordHash = hasher.digest(HASH_DIGEST_TYPE);

  return {
    email: email,
    salt: salt,
    passwordHash: passwordHash,
    type: userModel.USER_TYPES['USER']
  };
};

/**
 * Save the provided user.
 *
 * @param {Object} user - the user to save
 * @param {Function} cb - the callback function
 */
userModel.save = function(user, cb) {
  var params = {
    TableName: USER_TABLE_NAME,
    Item: dynamodbMarshaler.marshalItem(user)
  };

  dynamodb.putItem(params, function(err) {
    if (err) {
      logger.error('user-model: fail to save user', err);
    }

    cb(err);
  });
};

module.exports = userModel;
