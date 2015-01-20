var mongoose    = require('mongoose');
var log         = require('../../../app/logs_lib/logs_lib')(module);
var config      = require('../config');


var Schema = mongoose.Schema;


/**
 * Getters
 */

var getTags = function (tags) {
  return tags.join(',');
};

/**
 * Setters
 */

var setTags = function (tags) {
  return tags.split(',');
};

var InterestForBuy = new Schema({
  title: {type : String, default : '', trim : true},
  body: {type : String, default : '', trim : true},
  user: { type : Schema.ObjectId, ref : 'User' },
  comments: [{
    body: { type : String, default : '' },
    user: { type : Schema.ObjectId, ref : 'User' },
    createdAt: { type : Date, default : Date.now }
  }],
  tags: {type: [], get: getTags, set: setTags},
  createdAt  : {type : Date, default : Date.now}
});
/**
 * Validations
 */

InterestForBuy.path('title').required(true, 'InterestForBuy title cannot be blank');

InterestForBuy.methods = {
 /**
   * Add comment
   *
   * @param {User} user
   * @param {Object} comment
   * @param {Function} cb
   * @api private
   */

  addComment: function (user, comment, cb) {

    this.comments.push({
      body: comment.body,
      user: user._id
    });

    this.save(cb);
  },

  /**
   * Remove comment
   *
   * @param {commentId} String
   * @param {Function} cb
   * @api private
   */

  removeComment: function (commentId, cb) {
    var index = utils.indexof(this.comments, { id: commentId });
    if (~index) this.comments.splice(index, 1);
    else return cb('not found');
    this.save(cb);
  }
}

/**
 * Statics
 */

InterestForBuy.statics = {

  /**
   * Find InterestForBuy by id
   *
   * @param {ObjectId} id
   * @param {Function} cb
   * @api private
   */

  load: function (id, cb) {
    this.findOne({ _id : id })
      .populate('user', 'name email username')
      .populate('comments.user')
      .exec(cb);
  },

  /**
   * List InterestForBuy
   *
   * @param {Object} options
   * @param {Function} cb
   * @api private
   */

  list: function (options, cb) {
    var criteria = options.criteria || {}

    this.find(criteria)
      .populate('user', 'name username')
      .sort({'createdAt': -1}) // sort by date
      .limit(options.perPage)
      .skip(options.perPage * options.page)
      .exec(cb);
  }
}

var InterestForBuyModel = mongoose.model('InterestForBuy', InterestForBuy);
module.exports.InterestForBuyModel = InterestForBuyModel;

