var Promise = require('bluebird');

var mongoose = require('mongoose');

mongoose.Promise = Promise;

//promisify mongoose 
Promise.promisifyAll(mongoose.Model);
Promise.promisifyAll(mongoose.Model.prototype);
Promise.promisifyAll(mongoose.Query.prototype);

var conn = mongoose.createConnection('mongodb://localhost/hellobluebird');

var Schema = new mongoose.Schema({
    uid:    String,
    username:   String
});

var model = conn.model('user',Schema);

module.exports = model;