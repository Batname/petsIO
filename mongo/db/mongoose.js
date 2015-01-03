var mongoose    = require('mongoose');
//var path = require('path');
//console.log(path.join(__dirname, "../../app/logs_lib/logs_lib"));
var log         = require('../../app/logs_lib/logs_lib')(module);
var config      = require('./config');
var crypto      = require('crypto');

mongoose.connect(config.get('mongoose:uri'));
var db = mongoose.connection;

db.on('error', function (err) {
    log.error('connection error:', err.message);
});
db.once('open', function callback () {
    log.info("Connected to DB!");
});

var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: { type: String, trim: true, required: true },
    email: { type: String, unique: true, lowercase: true, trim: true },
    password: String,
    offers: [{type: mongoose.Schema.Types.ObjectId, ref: 'Offers'}]
});

var offersSchema = new Schema({
    name: { type: String, trim: true, required: true },
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

var User = mongoose.model('User', userSchema);
var Offers = mongoose.model('Offers', offersSchema);

module.exports.mongoose = mongoose;
module.exports.ArticleModel = User;
module.exports.UserModel = Offers;