"use strict";
var crypto = require('crypto');
var SALT_SIZE_IN_BYTES = 32;
var SALT_DIGEST_TYPE = 'hex';
var HASH_ALGORITHM = 'sha256';
var HASH_DIGEST_TYPE = 'hex';
var UserType;
(function (UserType) {
    UserType[UserType["Basic"] = 0] = "Basic";
    UserType[UserType["Moderator"] = 1] = "Moderator";
    UserType[UserType["Admin"] = 2] = "Admin";
})(UserType || (UserType = {}));
;
var User = (function () {
    function User(email, password, type) {
        this.email = email;
        this.type = type || UserType.Basic;
        if (password) {
            this.salt = this.generateSalt();
            this.passwordHashed = this.hashPassword(password, this.salt);
        }
    }
    User.prototype.generateSalt = function () {
        return crypto.randomBytes(SALT_SIZE_IN_BYTES).toString(SALT_DIGEST_TYPE);
    };
    User.prototype.hashPassword = function (password, salt) {
        var hash = crypto.createHash(HASH_ALGORITHM);
        hash.update(password + salt);
        return hash.digest().toString();
    };
    User.prototype.setSalt = function (salt) {
        this.salt = salt;
    };
    User.prototype.setPasswordHashed = function (passwordHashed) {
        this.passwordHashed = passwordHashed;
    };
    User.prototype.setType = function (type) {
        this.type = type;
    };
    User.fromJSON = function (json) {
        var user = new User(json.email);
        user.setSalt(json.salt);
        user.setPasswordHashed(json.passwordHashed);
        user.setType(json.type);
        return user;
    };
    User.prototype.toJSON = function () {
        return {
            email: this.email,
            salt: this.salt,
            passwordHashed: this.passwordHashed,
            type: this.type
        };
    };
    User.prototype.checkPassword = function (password) {
        return this.passwordHashed === this.hashPassword(password, this.salt);
    };
    return User;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = User;
