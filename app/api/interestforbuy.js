var express = require('express');
var passport = require('passport');
var interestforbuy = express.Router();

var UserModel = require('../../mongo/db/mongoose').UserModel;
var InterestForBuyModel = require('../../mongo/db/models/interestforbuy').InterestForBuyModel;
var log = require('../logs_lib/logs_lib')(module);


// all InterestForBuy

interestforbuy.get('/interestforbuy', function (req, res) {
    return InterestForBuyModel.find(function (err, interestforbuy) {
        if (!err) {
            return res.send(interestforbuy);
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s', res.statusCode, err.message);
            return res.send({error: 'Server error'});
        }
    });
});

// post InterestForBuy

interestforbuy.post('/interestforbuy', passport.authenticate('bearer', { session: false }), function(req, res) {
    var interestforbuy = new InterestForBuyModel(req.body)

    interestforbuy.user = req.user.userId;

    interestforbuy.save(function (err) {
        if (!err) {
            log.info("interestforbuy created");
            return res.send({ status: 'OK', interestforbuy:interestforbuy });
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

module.exports = interestforbuy;