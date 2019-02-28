// 观察者和被观察者  
// 观察者要存放在被观察者中,观察者要提供一个更新方法,当被观
// 察者的数据发生变换时，需要执行观察者的更新(update)方法

function Observer() {
    this.state = "不开心的";
    this.arr = [];
}
Observer.prototype.attach = function (s) {
    this.arr.push(s) // 把每个subject（观察者实例）放到被观察者中
}
Observer.prototype.setState = function (newState) {
    this.state = newState;
    // 当被观察者发生变化后，通知每个观察者调用更新方法
    this.arr.forEach(s => s.update(this.state));
}

function Subject(name, target) {
    this.name = name;
    this.target = target;
}

Subject.prototype.update = function (newState) {
    console.log(`${this.name}监控到了宝贝心情变化为${newState}`);
}

let o = new Observer();
// 
let s1 = new Subject("王宝春", o);
let s2 = new Subject("菅璐璐", o);
// 将两个观察者存放到被观察者中
o.attach(s1)
o.attach(s2)
// 被观察者跟新状态数据，
o.setState('开心');
o.setState('不开心');

// 观察者模式，观察者和被观察者有关系，基于发布订阅的