var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var methodOverride = require('method-override');
var passport = require('passport');
var bodyParser = require('body-parser');

var log = require('./logs_lib/logs_lib')(module);

var app = express();
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use(express.static(path.join(__dirname, "../public")));

var api = require('./api/api');
app.use('/api', api);

app.listen(3000, function(){
    console.log('Express server listening on port 3000');
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