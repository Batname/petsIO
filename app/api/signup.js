var express = require('express');
var log = require('../logs_lib/logs_lib')(module);
var signup = express.Router();

var UserModel  = require('../../mongo/db/mongoose').UserModel;

signup.post('/signup', function(req, res, next) {
    var user = new UserModel({
        username: req.body.username,
        password: req.body.password
    });
    user.save(function(err) {
        if (err) return next(err);
        else log.info("New user - %s:%s",user.username,user.password);
        res.send(200);
    });
});

module.exports = signup;