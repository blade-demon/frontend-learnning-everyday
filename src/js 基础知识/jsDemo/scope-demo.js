(function () {
  let a;

  for (let i = 0; i < 10; i++) {
    a = document.createElement("a");
    a.innerHTML = `${i}<br>`;
    a.addEventListener("click", (e) => {
      e.preventDefault();
      alert(i);
    });

    document.body.appendChild(a);
  }
})();

// 1、原型、原型链
// 2、闭包和作用域
// 3、异步、单线程
