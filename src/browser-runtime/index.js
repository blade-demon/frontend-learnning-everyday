const img = document.getElementById("img1");
img.onload = () => {
  console.log("img  loaded");
};

window.addEventListener("load", () => {
  console.log("page loaded");
});

window.onload = () => {
  console.log("page loaded");
};

document.addEventListener("DOMContentLoaded", () => {
  console.log("dom loaded");
});
