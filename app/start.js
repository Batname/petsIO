var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var passport = require('passport');
var bodyParser = require('body-parser');
var _ = require('lodash');
var config = require('../mongo/db/config');
var oauth2 = require('../mongo/db/oauth2');
var log = require('./logs_lib/logs_lib')(module);

var async = require('async');
var request = require('request');
var xml2js = require('xml2js');

var app = express();
app.use('/bower_components',  express.static(path.join(__dirname, "../bower_components")));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(express.static(path.join(__dirname, "../public")));


var offers = require('./api/offers');
var interestforbuy = require('./api/interest/interestforbuy');
var login = require('./api/login');
var signup = require('./api/signup');
var userInfo = require('./api/userInfo');
var users = require('./api/users');
var publicUser= require('./api/public/user');
app.use('/api', offers);
app.use('/api', interestforbuy);
app.use('/api', login);
app.use('/api', signup);
app.use('/api', userInfo);
app.use('/api', users);
app.use('/api/public', publicUser);


require('../mongo/db/auth');

app.listen(3000, function(){
    console.log('Express server listening on port 3000');
});

app.get('*', function(req, res) {
    res.redirect('/#' + req.originalUrl);
});

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.send(500, { message: err.message });
});

app.use(function(req, res, next){
    res.status(404);
    log.debug('Not found URL: %s',req.url);
    res.send({ error: 'Not found' });
});

app.use(function(err, req, res, next){
    res.status(err.status || 500);
    log.error('Internal error(%d): %s',res.statusCode,err.message);
    res.send({ error: err.message });
});

app.get('/ErrorExample', function(req, res, next){
    next(new Error('Random error!'));
});