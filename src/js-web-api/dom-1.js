// 如何避免频繁操作 dom
const listNode = document.getElementById("list");

// 创建一个文档片段，此时还没有插入到 DOM 树中
const frag = document.createDocumentFragment();

// 执行插入
for (let x = 0; x < 10; x++) {
  const li = document.createElement("li");
  li.innerHTML = `List item${x}`;
  frag.appendChild(li);
}

listNode.appendChild(frag);
