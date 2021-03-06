function Promise(executor) {
    let that = this;
    that.value = undefined;
    that.reason = undefined;
    that.onFulfilledCallbacks = [];
    that.onRejectedCallbacks = [];
    that.status = 'pending';

    function resolve(value) {
        if (that.status === 'pending') {
            that.status = 'fulfilled';
            that.value = value;
            that.onFulfilledCallbacks.forEach(fn => fn());
        }
    }

    function reject(reason) {
        if (that.status === 'pending') {
            that.status = 'rejected';
            that.reason = reason;
            that.onRejectedCallbacks.forEach(fn => fn());
        }
    }
    executor(resolve, reject);
}
/**
 * 处理链式调用than时的各种状况 固定值直接resolve(),如果是promise对象，循环引用
 *
 * @param {*} promise2
 * @param {*} x
 * @param {*} resolve
 * @param {*} reject
 */
function resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) { // 防止自己调用自己的than方法（自己等待自己）
        return reject(new TypeError('循环引用自己'));
    }
    let called;
    // 保证x是一个引用类型，这x有可能是一个promise
    if ((x !== null && typeof x === 'object') || typeof x === 'function') {
        try {
            let then = x.then; // then属性具有getter，此时获取时很有可能会发上异常
            if (typeof then === 'function') { // 如果then是一个函数，就认为返回的是promise（promiseA+中规定）
                // 如果是一个promise 就调用他的then 方法来确认他的状态是成功还是失败
                than.call(x, (y) => {
                    // 如果成功 让promise2变成成功态，resolve(y); 
                    // 这里y有可能是一个promise，就一直解析,知道y 是一个普通值
                    if (called) return;
                    called = true;
                    resolvePromise(promise2, y, resolve, reject);
                }, (r) => {
                    if (called) return;
                    called = true;
                    rejec(r);
                });
            } else { // 当前的than是一个对象 
                resolve(x);
            }
        } catch (error) {
            if (called) return;
            called = true;
            reject(error);
        }
    } else { // 如果x不是一个引用类型，则一定是一个普通值。
        resolve(x); // 普通值 直接成功即可
    }
}
// promise 的than方法
Promise.prototype.then = function (onFulfilled, onRejected) {
    let that = this;
    let promise2 = new Promise((resolve, reject) => {
        if (that.status === 'fulfilled') {
            setTimeout(() => { // 这里要使用promise2，所以要增加异步，保证可以获取到promise2
                try {
                    let x = onFulfilled(that.value);
                    resolvePromise(promise2, x, resolve, reject);
                } catch (error) {
                    reject(error);
                }
            }, 0);
        }
        if (that.status === 'rejected') {
            setTimeout(() => {
                try {
                    let x = onRejected(that.reason);
                    resolvePromise(promise2, x, resolve, reject);
                } catch (error) {
                    reject(error);
                }
            }, 0);
        }
        // 当状态是pending 状态时说明异步，需要将 成功的回调和失败的回调存存起来（订阅）
        if (that.status === 'pending') {
            that.onFulfilledCallbacks.push(function () {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(that.value);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
                }, 0);
            });
            that.onRejectedCallbacks.push(function () {
                setTimeout(() => {
                    try {
                        let x = onRejected(that.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
                }, 0);
            });
        }
    });
    return promise2
}

module.exports = Promise