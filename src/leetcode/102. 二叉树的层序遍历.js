/**
 * 102.链表随机节点
 * @link https://leetcode.cn/problems/binary-tree-level-order-traversal/
 */

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
  const res = [];
  if (!root) {
    return res;
  }

  // 初始化队列
  const q = [];
  q.push(root);

  while (q.length > 0) {
    const levelCount = q.length;
    const level = [];
    for (let i = 0; i < levelCount; i++) {
      // 节点出队列
      const node = q.shift();

      if (node.left) q.push(node.left);
      if (node.right) q.push(node.right);

      level.push(node.val);
    }

    res.push(level);
  }

  return res;
};
