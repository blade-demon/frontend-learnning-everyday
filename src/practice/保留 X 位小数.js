/**
 * @link https://juejin.cn/post/7206871218032918565 四舍六入五成双
 * 数字保留 X 位小数点
 * @param {Number|String} number 输入数字或者字符串
 * @param {Number} m  保留位数
 * @returns {String} 返回给定保留指定位数数字的字符串
 * @example fixedNum(0.01345678912, 4) => "0.0134"
 */
function toFixed(number, m) {
  if (typeof number !== "number") {
    throw new Error("number不是数字");
  }
  let result = Math.round(10 ** m * number) / 10 ** m;
  result = String(result);
  if (result.indexOf(".") === -1) {
    if (m !== 0) {
      result += ".";
      result += new Array(m + 1).join("0");
    }
  } else {
    const arr = result.split(".");
    if (arr[1].length < m) {
      arr[1] += new Array(m - arr[1].length + 1).join("0");
    }
    result = arr.join(".");
  }
  return result;
}
console.log(toFixed(0.01345678912, 4));

// 01 + 0.2 大于 0.3 的原因
(0.1).toPrecision(17); // '0.10000000000000001'
(0.2).toPrecision(17); // '0.20000000000000001'
(0.3).toPrecision(17); // '0.29999999999999999'
