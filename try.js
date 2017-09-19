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
    return model.one(uid);
}).then(function(info){
    console.log('two');
    if(!info){
        return model.two(uid,username);
    } else {
        return info;
    }
}).then(function(info){
    console.log('three',info)
    return model.three(uid);
}).then(function(){
    console.log('userFunc1');
    return model.userFunc1();
}).then(function(){
    console.log('userFunc2');
    // return Promise.reject('no_userInfo'); //出现错误直接停止 
    return model.userFunc2();
}).catch(function(e){
    if(e == 'no_userInfo'){
        console.error('helloooooo')
        return ;
    }
    console.error('error ',e);
});