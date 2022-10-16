/**
 * 字符串的左旋转操作是把字符串前面的若干个字符转移到字符串的尾部。请定义一个函数实现字符串左旋转操作的功能。比如，输入字符串"abcdefg"和数字2，该函数将返回左旋转两位得到的结果"cdefgab"。
 *
 * 示例 1：
 * 输入: s = "abcdefg", k = 2
 * 输出: "cdefgab"
 * 示例 2：

 * 输入: s = "lrloseumgh", k = 6
 * 输出: "umghlrlose"
 *  限制：1 <= k < s.length <= 10000
 * 
 * 标签：字符串遍历

 */

/**
 * 整体思路：在原字符串处从需要反转的位置 n 开始向后遍历，并保存到结果字符串中，然后再从原字符串的初始位置遍历到位置 n，继续添加到结果字符串
 * 时间复杂度：O(n)，空间复杂度：O(n)
 * @param {string} s
 * @param {number} n
 * @return {string}
 */

var reverseLeftWords = function (s, n) {
  // 方法一：使用公共方法
  // return s.substring(n, s.length) + s.substring(0, n)

  // 方法二：手动遍历
  let res = "";
  let length = s.length;

  for (let i = n; i < length; i++) {
    res += s[i];
  }

  for (let i = 0; i < n; i++) {
    res += s[i];
  }

  return s;
};
