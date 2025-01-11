/* eslint-disable no-use-before-define */
/**
 * 比较两个字符串的大小
 * 两个字符串都是用-连接的数字，比如 1-2-33-41-5
 * 比较方式是从左到右，依次比较每个数字的大小，遇到相等继续往后比较，遇到不同的数字直接得到比较结果
 *
 * s1 > s2 return 1
 * s1 < s2 return -1
 * s1 === s2 return 0
 */
function strCompare(s1, s2) {
  const gen1 = compareHelper(s1);
  const gen2 = compareHelper(s2);

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { value: v1, done: d1 } = gen1.next();
    const { value: v2, done: d2 } = gen2.next();

    if (d1 && d2) {
      return 0;
    }

    if (d1) {
      return -1;
    }

    if (d2) {
      return 1;
    }

    if (v1 > v2) {
      return 1;
    }

    if (v1 < v2) {
      return -1;
    }
  }
}

function* compareHelper(str) {
  let s = "";
  let i = 0;
  while (i < str.length) {
    const c = str[i];
    if (c !== "-") {
      s += c;
    } else {
      yield Number(s);
      s = "";
    }
    i += 1;
  }

  if (s) {
    yield Number(s);
  }
}

strCompare("1-2-3-4-5", "1-2-3-4-5"); // 0
strCompare("1-1115-21-33-41", "1-2-33-41-5"); // 1
strCompare("1-2-33-41-5", "1111-5-21-33-41"); // -1
