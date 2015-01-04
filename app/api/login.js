var express = require('express');
var login = express.Router();

var oauth2          = require('../../mongo/db/oauth2');

login.post('/login', oauth2.token);

module.exports = login;