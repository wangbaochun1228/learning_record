// 在开发中 1）接口的并发

// 树组件 获取文件夹的信息 + 文件的接口 = 渲染的数据

// fs模块 node的一个核心模块 在node API中 所有的回调函数的第一个参数都是err error-first
// code runner 默认会以根文件夹为基准
let fs = require('fs');

function after(times, fn) {
    let arr = []
    return function (data) { // 每次调用out 会触发此函数
        arr.push(data);
        console.log(times)
        if (--times == 0) {
            fn(arr)
        }
    }
}

let out = after(2, function (data) {
    console.log(data);
})

fs.readFile('./directory.txt', 'utf-8', function (err, data) {
    out(data)
})

fs.readFile('./file.txt', 'utf-8', function (err, data) {
    out(data)
})

// 发布订阅 promise redux eventBus 
// 观察者模式(基因发布订阅的)