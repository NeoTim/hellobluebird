let Promise = require('bluebird');

function one(){
    return new Promise(function(resolve, reject){
        resolve('one');
    });
}

function two(){
    return new Promise(function(resolve, reject){
        resolve('two');
    });
}

function three(){
    return new Promise(function(resolve, reject){
        resolve('three');
    });
}

one()
    .then(function(){
        return two();
    })
    .then(function(){
        return three();
    })
    .catch(function(error){
        console.error('error ',error);
    })
    .done(function(){
        console.log('done')
    });