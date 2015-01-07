var express = require('express');
var passport = require('passport');
var offers = express.Router();

var UserModel = require('../../mongo/db/mongoose').UserModel;
var OffersModel = require('../../mongo/db/mongoose').OffersModel;
var log = require('../logs_lib/logs_lib')(module);

// all offers
offers.get('/offers', function (req, res) {
    return OffersModel.find(function (err, offer) {
        if (!err) {
            return res.send(offer);
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s', res.statusCode, err.message);
            return res.send({error: 'Server error'});
        }
    });
});

// user offer
offers.get('/user/offers', passport.authenticate('bearer', {session: false}), function (req, res) {
    return OffersModel.find({user: req.user.userId}, function(err, offers){
        if (!err) {
            return res.send(offers);
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s',res.statusCode,err.message);
            return res.send({ error: 'Server error' });
        }
    });
});

// post offer
offers.post('/offers', passport.authenticate('bearer', {session: false}), function (req, res) {
    return UserModel.findById(req.user.userId, function (err, user) {
        if (!user) {
            res.statusCode = 404;
            return res.send({error: 'User not found'});
        }
        user.offers.create({
            name: req.body.name
        }, function (err, user, offer) {
            if (!err) {
                log.info("offer created");
                return res.send({status: 'OK', offer: offer});
            } else {
                console.log(err);
                if (err.name == 'ValidationError') {
                    res.statusCode = 400;
                    res.send({error: 'Validation error'});
                } else {
                    res.statusCode = 500;
                    res.send({error: 'Server error'});
                }
                log.error('Internal error(%d): %s', res.statusCode, err.message);
            }
        });
    });
});

// get offer
offers.get('/offers/:id', function (req, res) {
    return OffersModel.findById(req.params.id, function (err, offer) {
        if (!offer) {
            res.statusCode = 404;
            return res.send({error: 'Not found'});
        }
        if (!err) {
            return res.send({status: 'OK', offer: offer});
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s', res.statusCode, err.message);
            return res.send({error: 'Server error'});
        }
    });
});

// put offer
offers.put('/offers/:id', passport.authenticate('bearer', {session: false}), function (req, res) {
    return OffersModel.findById(req.params.id, function (err, offer) {
        if (offer.user.toString() == req.user._id.toString()) {
            if (!offer) {
                res.statusCode = 404;
                return res.send({error: 'Not found'});
            }
            offer.name = req.body.name;
            return offer.save(function (err) {
                if (!err) {
                    log.info("offer updated");
                    return res.send({status: 'OK', offer: offer});
                } else {
                    if (err.name == 'ValidationError') {
                        res.statusCode = 400;
                        res.send({error: 'Validation error'});
                    } else {
                        res.statusCode = 500;
                        res.send({error: 'Server error'});
                    }
                    log.error('Internal error(%d): %s', res.statusCode, err.message);
                }
            });
        }
        else {
            res.statusCode = 400;
            return res.send({error: 'You dont have permission', user: offer.user, userReq: req.user._id});
        }
    });
});

// delete offer
offers.delete('/offers/:id', passport.authenticate('bearer', {session: false}), function (req, res) {
    return UserModel.findById(req.user._id, function (err, user) {
        Array.prototype.has = function (v) {
            for (i = 0; i < this.length; i++) {
                if (this[i] == v) return true;
            }
            return false;
        };
        if (user.offers.has(req.params.id)) {
            if (!user) {
                res.statusCode = 404;
                return res.send({error: 'Not found'});
            }
            if (!err) {
                user.offers.remove(req.params.id, function (err, user) {
                });
                log.info("offer removed");
                return res.send({status: 'offer removed', offers: user.offers});
            } else {
                res.statusCode = 500;
                log.error('Internal error(%d): %s', res.statusCode, err.message);
                return res.send({error: 'Server error'});
            }
        } else {
            res.statusCode = 400;
            return res.send({error: 'You dont have permission or offer dont present', offers: user.offers});
        }

    });

});

module.exports = offers;