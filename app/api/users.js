var express = require('express');
var users = express.Router();

var OffersModel = require('../../mongo/db/mongoose').UserModel;
var log = require('../logs_lib/logs_lib')(module);

users.get('/users', function (req, res, next) {

    if (req.query.username) {
        OffersModel.findOne({username: req.query.username}, function (err, user) {
            if (err) return next(err);
            res.send({available: !user});
        });
    } else if (req.query.nickname) {
        OffersModel.findOne({nickname: req.query.nickname}, function (err, user) {
            if (err) return next(err);
            res.send({available: !user});
        })
    } else if ((!req.query.username) || (!req.query.nickname)) {
        return res.send(400, {message: 'Username or Email parameter is required.'});
    }

});

module.exports = users;