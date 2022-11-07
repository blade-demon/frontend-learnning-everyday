/**
 * 队列的最大值
 * @see https://leetcode.cn/leetbook/read/illustrate-lcof/58kj4j/
 */

var MaxQueue = function () {
  this.queue = [];
  this.deque = [];
};

/**
 * @return {number}
 */
MaxQueue.prototype.max_value = function () {
  return this.deque.length > 0 ? this.deque[0] : -1;
};

/**
 * @param {number} value
 * @return {void}
 */
MaxQueue.prototype.push_back = function (value) {
  this.queue.push(value);
  while (this.deque.length > 0 && value > this.deque[this.deque.length - 1]) {
    this.deque.pop();
  }
  this.deque.push(value);
};

/**
 * @return {number}
 */
MaxQueue.prototype.pop_front = function () {
  let head = this.queue.length > 0 ? this.queue.shift() : -1;
  if (this.deque.length > 0 && this.deque[0] === head) {
    this.deque.shift();
  }
  return head;
};

/**
 * Your MaxQueue object will be instantiated and called as such:
 * var obj = new MaxQueue()
 * var param_1 = obj.max_value()
 * obj.push_back(value)
 * var param_3 = obj.pop_front()
 */
