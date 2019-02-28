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

Promise.prototype.then = function (onFulfilled, onRejected) {
    let that = this;
    if (that.status === 'fulfilled') {
        onFulfilled(that.value);
    }
    if (that.status === 'rejected') {
        onRejected(that.reason)
    }
    // 当状态是pending 状态时说明异步，需要将 成功的回调和失败的回调存存起来（订阅）
    if (that.status === 'pending') {
        that.onFulfilledCallbacks.push(function () {
            onFulfilled(that.value);
        });
        that.onRejectedCallbacks.push(function () {
            onRejected(that.reason);
        });
    }
}

module.exports = Promise