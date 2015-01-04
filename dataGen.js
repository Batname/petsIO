var log                 = require('./app/logs_lib/logs_lib')(module);
var mongoose            = require('./mongo/db/mongoose').mongoose;
var UserModel           = require('./mongo/db/mongoose').UserModel;
var ClientModel         = require('./mongo/db/mongoose').ClientModel;
var AccessTokenModel    = require('./mongo/db/mongoose').AccessTokenModel;
var RefreshTokenModel   = require('./mongo/db/mongoose').RefreshTokenModel;
var faker               = require('faker');

UserModel.remove({}, function(err) {
    var user = new UserModel({ username: "bat", password: "21091091" });
    user.save(function(err, user) {
        if(err) return log.error(err);
        else log.info("New user - %s:%s",user.username,user.password);
    });

    for(i=0; i<4; i++) {
        var user = new UserModel({ username: faker.name.firstName().toLowerCase(), password: "21091091" });
        user.save(function(err, user) {
            if(err) return log.error(err);
            else log.info("New user - %s:%s",user.username,user.password);
        });
    }
});

ClientModel.remove({}, function(err) {
    var client = new ClientModel({ name: "OurService angular client v1", clientId: "angular", clientSecret:"21091091" });
    client.save(function(err, client) {
        if(err) return log.error(err);
        else log.info("New client - %s:%s",client.clientId,client.clientSecret);
    });
});
AccessTokenModel.remove({}, function (err) {
    if (err) return log.error(err);
});
RefreshTokenModel.remove({}, function (err) {
    if (err) return log.error(err);
});

setTimeout(function() {
    mongoose.disconnect();
}, 3000);