const p1 = new Promise((resolve, reject) => {});
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve();
  });
});

console.log(p1);
console.log(p2); // pending

setTimeout(() => {
  console.log("p2 settimeout", p2); // resolved
});

const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject();
  });
});

console.log("p3", p3); // pending

setTimeout(() => console.log("p3-settimeout", p3)); // rejected
