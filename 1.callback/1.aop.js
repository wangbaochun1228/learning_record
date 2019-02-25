Function.prototype.before = function (callback) {
    let that = this;
    return function () {
        callback()
        that.apply(that, arguments)
    }
}

function fn(value) {
    console.log('我要吃饭', value, va2)
}

let newFn = fn.before(function () {
    console.log('刷牙')
})

newFn('我', '你')