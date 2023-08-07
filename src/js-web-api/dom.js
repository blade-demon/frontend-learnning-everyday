// const div1 = document.getElementById("div1");
// console.log("div1", div1);

// const divList = document.getElementsByTagName("div");
// console.log("divList.length", divList.length);
// console.log("divList[1]", divList[1]);

// const containerList = document.getElementsByClassName("container");
// console.log("containerList.length", containerList.length);
// console.log("containerList[1]", containerList[1]);

// const pList = document.querySelectorAll("p");
// console.log("pList", pList);

const pList = document.querySelectorAll("p");
const p1 = pList[0];

// 考点：property 修改 dom 节点的 css 属性，不会体现在 html 结构中
p1.style.width = "100px";
// p1.className = "red";
console.log(p1.style.width);
// console.log(p1.className);
// console.log(p1.nodeName);
// console.log(p1.nodeType); // 1

// 考点： attribute 修改 dom 结构的 html 属性，像 class，id，src，会改变 html 结构
// p1.setAttribute("data-name", "test");
// p1.setAttribute("style", "font-size:50px");

// property 和 attribute 都有可能引起 DOM 重新渲染

const parentElement = document.getElementById("parent");
const childElement = document.getElementById("child");
const textNode = document.createTextNode("Some text");
const pChild = document.createElement("div");
pChild.textContent = "123";
parentElement.append(childElement, textNode, "<div>More content</div>", pChild);
