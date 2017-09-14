# learn bluebird promise library

## mongoose promisify

```
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

```

## function promisify

```
var Promise = require("bluebird");

var mongo = require('./mongo.js');

function Model(){}

Model.prototype.one = function (uid){
    return mongo.find({uid: uid}).then(function(data){
        return data;
    });
};

Model.prototype.two = function(uid, username){
    return mongo.create({uid:uid, username:username});
};

Model.prototype.three = function (uid){
    return mongo.find({uid: uid}).then(function(data){
        return data;
    });
};

//以上三个方法 由于mongoose 支持promise 所以不需要Promise.method再封装成返回promise的函数了。

//以下是自定义的函数 手动promise化
Model.prototype.userFunc1 = Promise.method(function(){
    return 'userFunc1';
});

Model.prototype.userFunc2 = function(){
    return new Promise(function(resolve,reject){
        resolve(1);
    });
};

var model = new Model();
// Start the chain of promises with Promise.try 等同于async.waterfall
const uid = '10010';
const username = 'test';
Promise.try(function(){
    console.log('one');
    return model.one(uid).then(function(data){
        // console.log(data);
    });
}).then(function(){
    console.log('two');
    return model.two(uid,username);
}).then(function(){
    console.log('three')
    return model.three(uid);
}).then(function(){
    console.log('userFunc1');
    return model.userFunc1();
}).then(function(){
    console.log('userFunc2');
    return model.userFunc2();
}).catch(function(e){
    console.error('error ',e);
}).finally(function(){
    console.log('finally');
});

//上门的方法 效果等同于 async.waterfall

```