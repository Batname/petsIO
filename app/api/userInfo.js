var express = require('express');
var passport = require('passport');
var userInfo = express.Router();

userInfo.get('/userInfo',
    passport.authenticate('bearer', { session: false }),
    function(req, res) {
        res.json({ user_id: req.user.userId, email: req.user.username, scope: req.authInfo.scope, offers: req.user.offers, nickname: req.user.nickname })
    }
);

module.exports = userInfo;