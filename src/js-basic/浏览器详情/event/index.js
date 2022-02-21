const parent = document.getElementById("parent");
const child = document.getElementById("child");
const son = document.getElementById("son");
const baidu = document.getElementById("a-baidu");

baidu.addEventListener("click", function (e) {
  e.preventDefault();
});

const banned = false;
window.addEventListener(
  "click",
  function (e) {
    if (banned) {
      e.stopPropagation();
      alert("你被封禁了");
      return;
    }
    console.log(
      `window 捕获`,
      e.target.nodeName,
      e.currentTarget.nodeName,
      this
    );
  },
  true
);

parent.addEventListener(
  "click",
  function (e) {
    // e.stopPropagation();
    console.log(
      `parent 捕获`,
      e.target.nodeName, // 当前点击的元素
      e.currentTarget.nodeName, // 当事件沿着 DOM 触发时事件的当前目标
      this
    );
  },
  true
);

child.addEventListener(
  "click",
  function (e) {
    console.log(
      `child 捕获`,
      e.target.nodeName,
      e.currentTarget.nodeName,
      this
    );
  },
  true
);

son.addEventListener(
  "click",
  function (e) {
    console.log(`son 捕获`, e.target.nodeName, e.currentTarget.nodeName, this);
  },
  true
);
// 冒泡
son.addEventListener("click", function (e) {
  console.log(`son 冒泡`, e.target.nodeName, e.currentTarget.nodeName, this);
});
child.addEventListener("click", function (e) {
  console.log(`child 冒泡`, e.target.nodeName, e.currentTarget.nodeName, this);
});
parent.addEventListener("click", function (e) {
  console.log(`parent 冒泡`, e.target.nodeName, e.currentTarget.nodeName, this);
});
window.addEventListener("click", function (e) {
  console.log(`window 冒泡`, e.target.nodeName, e.currentTarget.nodeName, this);
});
