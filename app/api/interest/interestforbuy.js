var express = require('express');
var passport = require('passport');
var interestforbuy = express.Router();

var UserModel = require('../../../mongo/db/mongoose').UserModel;
var InterestForBuyModel = require('../../../mongo/db/models/interestforbuy').InterestForBuyModel;
var log = require('../../logs_lib/logs_lib')(module);


// get all InterestForBuy

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

// get all InterestForBuy for user
interestforbuy.get('/user/:id/interestforbuy/', 
  function (req, res) {
    return InterestForBuyModel.find({user: req.params.id}, function(err, interestforbuy){
        if(!interestforbuy) {
          res.statusCode = 404;
          return res.send({ error: 'User not found' });
        }
        if (!err) {
            return res.send(interestforbuy);
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s',res.statusCode,err.message);
            return res.send({ error: 'Server error' });
        }
    });
});

// post InterestForBuy

interestforbuy.post('/interestforbuy', 
  passport.authenticate('bearer', { session: false }), 
  function(req, res) {
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

// get InterestForBuy by id
interestforbuy.get('/interestforbuy/:id', function(req, res) {
    return InterestForBuyModel.findById(req.params.id, function (err, interestforbuy) {
        if(!interestforbuy) {
            res.statusCode = 404;
            return res.send({ error: 'Not found' });
        }
        if (!err) {
            return res.send({ status: 'OK', interestforbuy:interestforbuy });
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s',res.statusCode,err.message);
            return res.send({ error: 'Server error' });
        }
    });
});

// put interestforbuy
interestforbuy.put('/interestforbuy/:id', 
    passport.authenticate('bearer', { session: false }), 
    function (req, res){
    return InterestForBuyModel.findById(req.params.id, function (err, interestforbuy) {
        if(!interestforbuy) {
            res.statusCode = 404;
            return res.send({ error: 'Not found' });
        }
        if (req.user.userId == interestforbuy.user) {
        interestforbuy.title = req.body.title;
        interestforbuy.body = req.body.body;
        return interestforbuy.save(function (err) {
            if (!err) {
                log.info("interestforbuy updated");
                return res.send({ status: 'OK', interestforbuy:interestforbuy });
            } else {
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
      } else {
            res.statusCode = 400;
            return res.send({error: 'You dont have permission'});
        }
    });
});

// delete interestforbuy
interestforbuy.delete('/interestforbuy/:id', 
  passport.authenticate('bearer', { session: false }), 
  function (req, res){
    return InterestForBuyModel.findById(req.params.id, function (err, interestforbuy) {
        if(!interestforbuy) {
            res.statusCode = 404;
            return res.send({ error: 'Not found' });
        }
        if (req.user.userId == interestforbuy.user) {
        return interestforbuy.remove(function (err) {
            if (!err) {
                log.info("interestforbuy removed");
                return res.send({ status: 'OK' });
            } else {
                res.statusCode = 500;
                log.error('Internal error(%d): %s',res.statusCode,err.message);
                return res.send({ error: 'Server error' });
            }
        });
      } else {
            res.statusCode = 400;
            return res.send({error: 'You dont have permission'});
        }
    });
});


module.exports = interestforbuy;