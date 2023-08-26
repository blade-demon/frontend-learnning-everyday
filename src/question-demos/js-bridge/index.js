/**
 * 什么是 js-bridge
 * JS无法直接调用native API
 * 需要通过一些特定的格式调用
 * 这些格式统称之为‘js-bridge’，例如微信 js-sdk
 *
 */

// 方式 1：注册全局 API，比如 window.xxxx，缺点是不适合异步场景
// 假如 window 全局存在一个获取 App 版本的 API
// const version = window.getAppVersion();

// 方式 2：URL scheme 拦截的方式
const iframe1 = document.getElementById("iframe1");
iframe1.onload = function () {
  const content = iframe1.contentWindow.document.body.innerHTML;
  console.info("content", content);
};

// 在 App 中可以替换 src 的值为自定义的 scheme 格式
iframe1.src = `my-app-name://api/getVersion`; // app 中 Scheme的格式
iframe1.src = "http://127.0.0.1:5500/src/question-demos/requestAnimationFrame/requestAnimationFrame.html";
