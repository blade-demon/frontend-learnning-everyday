// 目的：验证宏任务和微任务的先后执行顺序
const $p1 = $("<p>一段文字</p>");
const $p2 = $("<p>一段文字</p>");
const $p3 = $("<p>一段文字</p>");
const $p4 = $("<p>一段文字</p>");

$("#container").append($p1).append($p2).append($p3).append($p4);

// console.log("length", $("#container").children().length);

// alert("本次 callstack 结束，DOM 结构已更新，但尚未触发渲染");

// 微任务在DOM 渲染前触发
Promise.resolve().then(() => {
  console.log("length1", $("#container").children().length);

  alert("本次 callstack 结束，DOM 结构已更新，但尚未触发渲染");

  alert("promise then"); // DOM 未渲染
});

// 宏任务在DOM 渲染后触发
setTimeout(() => {
  console.log("length2", $("#container").children().length);

  alert("本次 callstack 结束，DOM 结构已更新，但尚未触发渲染");

  alert("setTimeout"); // DOM 已渲染
});
