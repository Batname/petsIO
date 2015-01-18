var express = require('express');
var publicUser = express.Router();

var UserModel = require('../../../mongo/db/mongoose').UserModel;
var OffersModel = require('../../../mongo/db/mongoose').OffersModel;
var log = require('../../logs_lib/logs_lib')(module);

// get public user Info
publicUser.get('/user/:id', function (req, res){
	return UserModel.findById(req.params.id, function (err, user){
		if(!user) {
			res.statusCode = 404;
			return res.send({error: 'Not found'})
		}
		if(!err) {
			return res.send(
				{
					status: 'OK',
					user_id: user.userId,
          email: user.username,
          offers: user.offers,
          nickname: user.nickname,
          description: user.description
				}
				)
		}
		else {
        res.statusCode = 500;
        log.error('Internal error(%d): %s',res.statusCode,err.message);
        return res.send({ error: 'Server error' });
    }
	});
});

// get all public User Offer
publicUser.get('/user/offers/:id', function (req, res) {
    return OffersModel.find({user: req.params.id}, function(err, offers){
				if(!offers) {
					res.statusCode = 404;
					return res.send({error: 'Not found'})
				}
        if (!err) {
            return res.send(offers);
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s',res.statusCode,err.message);
            return res.send({ error: 'Server error' });
        }
    });
});

module.exports = publicUser;