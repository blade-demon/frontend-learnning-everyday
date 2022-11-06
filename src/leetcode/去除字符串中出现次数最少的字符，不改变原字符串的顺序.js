/**
 * 去除字符串中出现次数最少的字符，不改变原字符串的顺序。
 * “ababac” —— “ababa”
 * “aaabbbcceeff” —— “aaabbb”
 */

var filterRepeatedStr = (str) => {
  const occMap = new Map();
  let minSize = str.length;
  let res;

  for (let ch of str) {
    occMap.set(ch, occMap.has(ch) ? occMap.get(ch) + 1 : 1);
  }

  for (let [key, value] of occMap) {
    if (value < minSize) {
      minSize = value;
    }
  }

  for (let [key, value] of occMap) {
    if (value === minSize) {
      res = res ? res.replaceAll(key, "") : str.replaceAll(key, "");
    }
  }
  console.log("res: ", res);
  return res;
};

filterRepeatedStr("aaabbbcceeff");
