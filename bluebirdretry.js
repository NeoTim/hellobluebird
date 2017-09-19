var Promise = require('bluebird');
var retry = require('bluebird-retry');

var count = 0;
function myfunc(params) {
    console.log('myfunc called ' + (++count) + ' times', params, new Date);
    if (count < 3) {
        return Promise.reject('fail the first two times');
    } else {
        return Promise.resolve('succeed the third time');
    }
}

retry(myfunc.bind(null,{id:1}),{max_tries:3,interval: 2000,max_interval:3000,timeout:15000})
.catch(e=>{
    console.error('haha',e.code);
    return e.code;
})
.then(function(result) {
    console.log('-=-=-',result);
    return result;
}).catch(e=>{
    console.error('error',e.code,e.message);
});

