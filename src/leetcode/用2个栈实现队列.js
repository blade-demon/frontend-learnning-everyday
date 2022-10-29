/**
 * 用两个栈实现一个队列。队列的声明如下，请实现它的两个函数 appendTail 和 deleteHead ，分别完成在队列尾部插入整数和在队列头部删除整数的功能。(若队列中没有元素，deleteHead 操作返回 -1 )
 * 示例 1：
 *
 *  输入：
 *   ["CQueue","appendTail","deleteHead","deleteHead","deleteHead"]
 *   [[],[3],[],[],[]]
 *   输出：[null,null,3,-1,-1]
 *
 * 示例 2：
 *   输入：
 *   ["CQueue","deleteHead","appendTail","appendTail","deleteHead","deleteHead"]
 *   [[],[],[5],[2],[],[]]
 *   输出：[null,-1,null,null,5,2]
 *   提示：
 *   1 <= values <= 10000
 *   最多会对 appendTail、deleteHead 进行 10000 次调用*
 *
 * 思路
 *   标签：栈和队列
 *   整体思路：栈实现队列的本质就是负负得正，两次先进后出的结果就是先进先出了。在构造函数中完成两个栈的初始化工作，在 appendTail 函数中向其中一个栈 stack1 结尾插入整数，在 deleteHead 函数中如果 stack2 为空，则将 stack1 的值全部弹出放到 stack2 中，再从 stack2 中取值，这样达到了负负为正的队列效果
 *   时间复杂度：O(1)
 *   空间复杂度：O(n)
 */

var CQueue = function () {
  this.stack1 = [];
  this.stack2 = [];
};

/**
 * @param {number} value
 * @return {void}
 */
CQueue.prototype.appendTail = function (value) {
  this.stack1.push(value);
};

/**
 * @return {number}
 */
CQueue.prototype.deleteHead = function () {
  if (this.stack2.length == 0) {
    while (this.stack1.length != 0) {
      this.stack2.push(this.stack1.pop());
    }
  }
  if (this.stack2.length == 0) {
    return -1;
  } else {
    return this.stack2.pop();
  }
};

/**
 * Your CQueue object will be instantiated and called as such:
 * var obj = new CQueue()
 * obj.appendTail(value)
 * var param_2 = obj.deleteHead()
 */
