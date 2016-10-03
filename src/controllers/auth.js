"use strict";
var userService = require('../services/user');
exports.createUser = function (req, res, next) {
    if (!validateUserRequestBody(req.body)) {
        res.status(400).end();
        return;
    }
    userService.createUser(req.body.email, req.body.password, function (err) {
        if (err) {
            res.status(500).end();
            return;
        }
        res.status(200).end();
    });
};
function validateUserRequestBody(body) {
    if (!(body instanceof Object)) {
        return false;
    }
    if (body.hasOwnProperty('email') || body.hasOwnProperty('password')) {
        return false;
    }
    return true;
}
