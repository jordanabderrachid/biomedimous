'use strict';

var authService = require('../services/auth');

var authController = {};

authController.createUser = function(req, res) {
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
  if (!req.body.email || !req.body.password) {
      res.status(400).end();
      return;
  }

  var user = {
    email: req.body.email,
    password: req.body.password
  };

  authService.authenticateUser(user, function(err) {
    if (err) {
      res.status(401).end();
      return;
    }

    res.status(200).end();
  });
};

module.exports = authController;
