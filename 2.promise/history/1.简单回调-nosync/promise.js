function Promise(executor) {
    let that = this;
    that.value = undefined;
    that.reason = undefined;
    that.status = 'pending';

    function resolve(value) {
        if (that.status === 'pending') {
            that.status = 'fulfilled';
            that.value = value;
        }
    }

    function reject(reason) {
        if (that.status === 'pending') {
            that.status = 'rejected';
            that.reason = reason;
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
}

module.exports = Promise