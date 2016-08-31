'use strict';

var authService = require('../services/auth');

var authController = {};

authController.createUser = function(req, res) {
  // TODO Check if the request body is valid.
  var user = {
    email: req.body.email,
    password: req.body.password
  };

  authService.createUser(user, function(err) {
    if (err) {
      res.status(500).end();
      return;
    }

    res.status(200).end();
  });
};

authController.authenticateUser = function(req, res) {
  // TODO Check if the request body is valid.
  var user = {
    email: req.body.email,
    password: req.body.password
  };

  authService.authenticateUser(user, function(err) {
    if (err) {
      res.status(500).end();
      return;
    }

    res.status(200).end();
  });
};

module.exports = authController;
