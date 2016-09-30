'use strict';

var crypto = require('crypto');

var TOKEN_SIZE = 32; // bytes
var TOKEN_DIGEST_TYPE = 'hex';

var tokenStore;

var TokenStore = function() {
  this.store = {};
};

/**
 * Store a user, return its access token.
 *
 * @param {User} user - the user to store
 * @param {Function} cb - the callback function
 */
TokenStore.prototype.addUser = function(user, cb) {
  var token = crypto.randomBytes(TOKEN_SIZE).toString(TOKEN_DIGEST_TYPE);

  this.store[token] = user;

  process.nextTick(cb.bind(null, null, token));
};

/**
 * Get a user from the store.
 *
 * @param {String} token - the token
 * @param {Function} cb - the callback function
 */
TokenStore.prototype.getUser = function(token, cb) {
  process.nextTick(cb.bind(null, null, this.store[token]));
};

var getStore = function() {
  if (typeof tokenStore === 'undefined') {
    tokenStore = new TokenStore();
  }

  return tokenStore;
};

module.exports = getStore();
