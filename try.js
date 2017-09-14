var Promise = require("bluebird");

var mongo = require('./mongo.js');

function Model(){

}

Model.prototype.one = Promise.method(function (uid){
    return mongo.find({uid: uid}).then(function(data){
        return data;
    });
});

Model.prototype.two = Promise.method(function(uid, username){
    return mongo.create({uid:uid, username:username});
});

Model.prototype.three = Promise.method(function (uid){
    return mongo.find({uid: uid}).then(function(data){
        return data;
    });
});

var model = new Model();
// Start the chain of promises with Promise.try 等同于async.waterfall
const uid = '10010';
const username = 'test';
Promise.try(function(){
    console.log('one');
    return model.one(uid).then(function(data){
        console.log(data);
    });
}).then(function(){
    console.log('two');
    return model.two(uid,username);
}).then(function(){
    console.log('three')
    return model.three(uid).then(function(data){
        console.log(data);
    });
}).catch(function(e){
    console.error('error ',e);
}).finally(function(){
    console.log('finally');
});