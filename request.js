var Promise = require('bluebird');
var request = Promise.promisifyAll(require('request'),{multiArgs: true});

var option = { method: 'POST',
uri: 'https://up-b.pengpengla.com/open/getUserInfo',
body: 'n6DOq90Lq9Qd8htH+URhigl0A67vzH3c3AnIMO/yvXCZghHkXZdnLPziXrgFSTO9T8Gs4bswfV3MG0/4Vfi3lmTUyvQQl10aIMlsgaCkY3qLHyrdV0xM9MAOIphOfgjR65JsTd+WW9oAFvutwXx+bCzyFwVab5Flmmx+yV6z7nY=',
headers: { appId: 'owngame10000' },
json: true,
timeout: 15000 }

request.postAsync(option).then(function(resp){
    console.log('sss',resp[1]);
    return resp[1];
}).then(function(info){
    console.log('info',info)
})