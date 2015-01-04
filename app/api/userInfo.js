var express = require('express');
var passport = require('passport');
var userInfo = express.Router();

userInfo.get('/userInfo',
    passport.authenticate('bearer', { session: false }),
    function(req, res) {
        res.json({ user_id: req.user.userId, name: req.user.username, scope: req.authInfo.scope, offers: req.user.offers })
    }
);

module.exports = userInfo;