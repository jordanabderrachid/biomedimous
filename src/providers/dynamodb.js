"use strict";
var aws_sdk_1 = require('aws-sdk');
var DYNAMODB_REGION = 'eu-west-1';
var DYNAMODB_VERSION = '2012-08-10';
var instance;
function createInstance() {
    return new aws_sdk_1.DynamoDB.DocumentClient({
        apiVersion: DYNAMODB_VERSION,
        region: DYNAMODB_REGION
    });
}
function getInstance() {
    if (!instance) {
        instance = createInstance();
    }
    return instance;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getInstance();
