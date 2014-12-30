var express = require('express');
var api = express.Router();

api.get('/', function (req, res) {
    res.send('API is running');
});

module.exports = api;