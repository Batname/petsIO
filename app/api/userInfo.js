var express = require('express');
var passport = require('passport');
var userInfo = express.Router();

var UserModel = require('../../mongo/db/mongoose').UserModel;
var log = require('../logs_lib/logs_lib')(module);

userInfo.get('/userInfo',
    passport.authenticate('bearer', {session: false}),
    function (req, res) {
        return UserModel.findById(req.user.userId, function (err, user) {
            if(!user) {
                res.statusCode = 404;
                return res.send({ error: 'Not found' });
            }
            if (!err) {
                return res.send({ status: 'OK',
                    user_id: user.userId,
                    email: user.username,
                    offers: user.offers,
                    nickname: user.nickname,
                    description: user.description });
            } else {
                res.statusCode = 500;
                log.error('Internal error(%d): %s',res.statusCode,err.message);
                return res.send({ error: 'Server error' });
            }
        });
    }
);

userInfo.put('/userInfo/:id', passport.authenticate('bearer', {session: false}), function (req, res) {
    return UserModel.findById(req.params.id, function (err, user) {
        if (req.user.userId == req.params.id) {
            if (!user) {
                res.statusCode = 404;
                return res.send({error: 'Not found'});
            }
            user.description = req.body.description;
            return user.save(function (err) {
                if (!err) {
                    log.info("user updated");
                    return res.send({ status: 'OK',
                        user_id: user.userId,
                        email: user.username,
                        offers: user.offers,
                        nickname: user.nickname,
                        description: user.description });
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
        } else {
            res.statusCode = 400;
            return res.send({error: 'You dont have permission'});
        }

    });
});

userInfo.delete('/userInfo/:id', passport.authenticate('bearer', {session: false}), function (req, res) {
    return UserModel.findById(req.params.id, function (err, user) {
        if (req.user.userId == req.params.id) {
            if (!user) {
                res.statusCode = 404;
                return res.send({error: 'Not found'});
            }
            return user.remove(function (err) {
                if (!err) {
                    log.info("user removed");
                    return res.send({status: 'OK'});
                } else {
                    res.statusCode = 500;
                    log.error('Internal error(%d): %s', res.statusCode, err.message);
                    return res.send({error: 'Server error'});
                }
            });
        } else {
            res.statusCode = 400;
            return res.send({error: 'You dont have permission'});
        }
    });
});

module.exports = userInfo;