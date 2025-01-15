/**
 * 获取url链接的search参数
 * @param {string} url 链接
 * @returns {Object} 参数对象
 */
function parseUrlSearchQuery(url) {
  if (!url) return {};

  const res = {};
  url.replace(/([^?&=]+)=([^&]+)/g, (_, key, value) => {
    res[key] = value;
  });
  return res;
}

function parseUrlSearchQuery2(url) {
  if (!url) return {};

  const res = {};
  const { search } = new URL(url);
  const searchParams = new URLSearchParams(search);
  Array.from(searchParams).forEach(([key, value]) => {
    res[key] = value;
  });

  return res;
}

const result = parseUrlSearchQuery("https://abc.com?a=1&b=2&c=3"); // { a: '1', b: '2', c: '3' }
const result2 = parseUrlSearchQuery2("https://abc.com?a=1&b=2&c=3"); // { a: '1', b: '2', c: '3' }

console.log("result: ", result);
console.log("result2: ", result2);
