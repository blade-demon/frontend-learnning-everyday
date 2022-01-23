// ES2020 feature
const promiseOne = new Promise((resolve, reject) => setTimeout(resolve));
const promiseTwo = new Promise((resolve, reject) => setTimeout(reject));

// Promise.all([promiseOne, promiseTwo]).then(console.log); // UnhandledPromiseRejection
// description: ignore error with allSettled
Promise.allSettled([promiseOne, promiseTwo])
  .then(console.log)
  .catch((e) => console.log("something failed!", e));
