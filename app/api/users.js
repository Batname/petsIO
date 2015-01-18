var express = require('express');
var passport = require('passport')
var users = express.Router();

var UserModel = require('../../mongo/db/mongoose').UserModel;
var log = require('../logs_lib/logs_lib')(module);

users.get('/users', function (req, res, next) {

    if (req.query.username) {
        UserModel.findOne({username: req.query.username}, function (err, user) {
            if (err) return next(err);
            res.send({available: !user});
        });
    } else if (req.query.nickname) {
        UserModel.findOne({nickname: req.query.nickname}, function (err, user) {
            if (err) return next(err);
            res.send({available: !user});
        })
    } else if ((!req.query.username) || (!req.query.nickname)) {
        return res.send(400, {message: 'Username or Email parameter is required.'});
    }
});

// all users
users.get('/allusers', function (req, res) {
    return UserModel.find(function (err, users) {
        if (!err) {
            return res.send(users);
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s', res.statusCode, err.message);
            return res.send({error: 'Server error'});
        }
    });
});

module.exports = users;