/**
 * 定义栈的数据结构，请在该类型中实现一个能够得到栈的最小元素的 min 函数在该栈中，调用 min、push 及 pop 的时间复杂度都是 O(1)。
 * 示例:
 *
 *  MinStack minStack = new MinStack();
 *  minStack.push(-2);
 *  minStack.push(0);
 *  minStack.push(-3);
 *  minStack.min();   --> 返回 -3.
 *  minStack.pop();
 *  minStack.top();      --> 返回 0.
 *  minStack.min();   --> 返回 -2.
 */

/**
 * initialize your data structure here.
 */
var MinStack = function () {
  this.stack1 = [];
  this.stack2 = [];
};

/**
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function (x) {
  this.stack1.push(x);
  if (this.stack2.length === 0 || this.stack2[this.stack2.length - 1] >= x) {
    this.stack2.push(x);
  }
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function () {
  if (this.stack1.pop() == this.stack2[this.stack2.length - 1]) {
    this.stack2.pop();
  }
};

/**
 * @return {number}
 */
MinStack.prototype.top = function () {
  return this.stack1[this.stack1.length - 1];
};

/**
 * @return {number}
 */
MinStack.prototype.min = function () {
  return this.stack2[this.stack2.length - 1];
};

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(x)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.min()
 */
