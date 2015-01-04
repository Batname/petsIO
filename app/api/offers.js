var express = require('express');
var passport = require('passport');
var offers = express.Router();

var OffersModel    = require('../../mongo/db/mongoose').OffersModel;
var log = require('../logs_lib/logs_lib')(module);

offers.get('/offers', function(req, res) {
    return OffersModel.find(function (err, articles) {
        if (!err) {
            return res.send(articles);
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s',res.statusCode,err.message);
            return res.send({ error: 'Server error' });
        }
    });
});

offers.post('/offers', passport.authenticate('bearer', { session: false }), function(req, res) {
    var offers = new OffersModel({
        name: req.body.name,
        user: req.user.userId
    });

    offers.save(function (err) {
        if (!err) {
            log.info("offer created");
            return res.send({ status: 'OK', offers:offers });
        } else {
            console.log(err);
            if(err.name == 'ValidationError') {
                res.statusCode = 400;
                res.send({ error: 'Validation error' });
            } else {
                res.statusCode = 500;
                res.send({ error: 'Server error' });
            }
            log.error('Internal error(%d): %s',res.statusCode,err.message);
        }
    });
});

module.exports = offers;