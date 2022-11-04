/**
 * 请从字符串中找出一个最长的不包含重复字符的子字符串，计算该最长子字符串的长度。
 *   示例 1:
 *   输入: "abcabcbb"
 *   输出: 3
 *   解释: 因为无重复字符的最长子串是、 "abc"，所以其长度为 3。
 *   示例 2:
 *   输入: "bbbbb"
 *   输出: 1
 *   解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
 *   示例 3:
 *   输入: "pwwkew"
 *   输出: 3
 *   解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
 *        请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
 */

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  // 哈希集合，记录每个字符是否出现过
  const occ = new Set();
  const n = s.length;
  // 右指针，初始值为 -1，相当于我们在字符串的左边界的左侧，还没有开始移动
  let rk = -1,
    res = 0;

  for (let i = 0; i < n; i++) {
    if (i !== 0) {
      // 左指针向右移动一格，移除一个字符
      occ.delete(s.charAt(i - 1));
    }

    while (rk + 1 < n && !occ.has(s.charAt(rk + 1))) {
      // 不断地移动右指针
      occ.add(s.charAt(rk + 1));
      ++rk;
    }

    res = Math.max(res, rk + 1 - i);
  }

  return res;
};
