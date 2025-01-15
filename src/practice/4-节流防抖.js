/**
 * 防抖 (debounce)
 * @param {Function} fn
 * @param {Number} delay
 * @return {Function}
 */
function debounce(fn, delay) {
  let timer = null;
  return function debounceFunction(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

/**
 *  节流 (throttle)
 *  @param {Function} fn
 *  @param {Number} delay
 *  @return {Function}
 */
function throttle(fn, delay) {
  let calledTime = 0;
  return function throttledFunction(...args) {
    const now = new Date().getTime();
    if (now - calledTime >= delay) {
      fn.apply(this, args);
      calledTime = now;
    }
  };
}

// 测试函数
function logMessage(message) {
  console.log(`${new Date().toLocaleTimeString()}: ${message}`);
}

// 测试节流函数
const throttledLog = throttle(() => logMessage("Throttled!"), 2000);

// 测试防抖函数
const debouncedLog = debounce(() => logMessage("Debounced!"), 2000);

// 模拟快速连续调用
console.log("Testing throttle:");
// eslint-disable-next-line no-plusplus
for (let i = 0; i < 10; i++) {
  setTimeout(throttledLog, i * 300); // 调用间隔300ms
}

setTimeout(() => {
  console.log("Testing debounce:");
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 10; i++) {
    setTimeout(debouncedLog, i * 300); // 调用间隔300ms
  }
}, 5000);
