// 测试promise 写的是否符合promiseA+规范
// Promise.defer 对象
let fs = require("fs");
let Promise = require('./promise');

// function read() {
//     return new Promise((resolve, reject) => {
//         fs.readFile(url, 'utf-8', (err, data) => {
//             if (err) reject(err);
//             resolve(data);
//         })
//     })
// }

// 通过defer 将嵌套的Promise 转换成不嵌套

function read(url) {
    let defer = Promise.defer();
    fs.readFile(url, 'utf-8', (err, data) => {
        if (err) defer.reject(err);
        defer.resolve(data);
    })
    return defer.promise;
}

read('./name.txt').then(data => {
    console.log(data);
})