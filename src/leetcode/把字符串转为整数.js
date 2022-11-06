/**
 * 把字符串转为整数
 * @see - https://leetcode.cn/leetbook/read/illustrate-lcof/e2im3i/
 */

/**
 * @param {string} str
 * @return {number}
 */
var strToInt = function (str) {
  let res;
  let trimedStr = str.trim();
  const pattern = /^[\-|\+]?\d+/g;
  const matchResult = trimedStr.match(pattern);

  if (!matchResult) {
    res = 0;
  } else if (Array.isArray(matchResult)) {
    res = matchResult[0];
    res = Math.max(Math.min(res, 2 ** 31 - 1), (-2) ** 31);
  }

  return res;
};
