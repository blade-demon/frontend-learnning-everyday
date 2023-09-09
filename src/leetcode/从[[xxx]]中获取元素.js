/**
 * 从 [[abc]]123[[def]]1231231[[ghi]]
 */
const inputString = "[[abc]]123[[def]]1231231[[ghi]]";

function extraTextFromStr(str) {
  // 输入字符串
  let currentIndex = 0;
  const result = [];

  while (true) {
    const start = str.indexOf("[[", currentIndex);
    if (start === -1) {
      break;
    }

    const end = str.indexOf("]]", start + 2);
    if (end === -1) {
      break;
    }

    const extractedStr = str.slice(start + 2, end);
    result.push(extractedStr);
    currentIndex += end + 2;
  }

  return result;
}

/**
 * 使用正则实现，写法更优雅，兼容性问题要注意，matchAll() 方法避免了重复写 while
 * matchAll() 方法返回一个迭代器，该迭代器包含了检索字符串与正则表达式进行匹配的所有结果（包括捕获组）。
 * @link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/matchAll
 */
function extraTextFromStr2(str) {
  const regexp = /\[\[(.*?)\]\]/g; // 返回迭代器
  return Array.from(str.matchAll(regexp), (m) => m[1]);
}

/**
 * 方法在一个指定字符串中执行一个搜索匹配。返回一个结果数组或 null。
 * 兼容性更好
 * @link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec
 * @param {string} str
 *
 */
function extraTextFromStr3(sourceStr) {
  // 正则表达式模式
  const regexPattern = /\[\[(.*?)\]\]/g;

  // 存储匹配结果的数组
  const matches = [];

  // 使用正则表达式匹配字符串
  let match;
  while ((match = regexPattern.exec(sourceStr)) !== null) {
    // 将匹配的内容添加到数组中
    matches.push(match[1]);
  }

  // 输出匹配结果
  console.log(matches); // 输出 ["abc", "def"]
}

console.log(extraTextFromStr2(inputString));
console.log(extraTextFromStr3(inputString));
