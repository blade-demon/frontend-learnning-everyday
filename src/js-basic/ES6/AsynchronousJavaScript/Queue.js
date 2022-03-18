// Callback Queue - Task Queue 低优先级
setTimeout(() => console.log("1", "is the longliest number"), 0);
setTimeout(() => console.log("2", "as bad as one"), 10);

// Job Queue - Microtask Queue 高优先级
Promise.resolve("hi").then((data) => console.log("2", data));

// 3
console.log("3", "is a crowd");
