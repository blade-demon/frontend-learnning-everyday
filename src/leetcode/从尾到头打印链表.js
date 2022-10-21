/**
 * 输入一个链表的头节点，从尾到头反过来返回每个节点的值（用数组返回）。
 *
 * 示例 1：
 * 输入：head = [1,3,2]
 * 输出：[2,3,1]
 *
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {number[]}
 */
var reversePrint = function (head) {
  let stack = [];
  let pointer = head;

  while (pointer != null) {
    stack.push(pointer.val);
    pointer = pointer.next;
  }

  let res = [];
  let length = stack.length;
  for (let i = 0; i < length; i++) {
    res.push(stack.pop());
  }

  return res;
};
