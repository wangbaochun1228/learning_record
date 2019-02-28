// let Promise = require('./promise');
// 想要支持异步就是要在执行 resolve 或者 reject 的时候在执行函数。
// new promise 时可以支持异步逻辑
// 同一个promise实例可以多次then
let p = new Promise(function (resolve, reject) {
    setTimeout(function () {
        reject('二毛回来了')
    }, 2000)
    setTimeout(function () {
        reject('大毛回来了')
    }, 1000)
});

p.then(value => {
    console.log('success', value)
}, reason => {
    console.log('error', reason)
})
p.then(value => {
    console.log('success', value)
}, reason => {
    console.log('error', reason)
})
console.log('end')