'use strict';

var crypto = require('crypto');

var SALT_SIZE_IN_BYTES = 32; // bytes
var SALT_DIGEST_TYPE = 'hex';

var HASH_TYPE = 'sha256';
var HASH_DIGEST_TYPE = 'hex';

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

module.exports = userModel;
