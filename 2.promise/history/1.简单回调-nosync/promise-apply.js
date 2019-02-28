let Promise = require('./promise');

let p = new Promise(function (resolve, reject) {
    resolve('大毛回来了')
    reject('二毛没回来了')
});

p.then(value => {
    console.log('success', value)
}, reason => {
    console.log('error', reason)
})
console.log('end')