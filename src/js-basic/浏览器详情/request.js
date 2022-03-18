fetch("http://domain/service", {
  method: "GET",
  credentials: "same-origin",
})
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error("http error");
  })
  .then((json) => {
    console.log(json);
  })
  .catch((error) => {
    console.error(error);
  });

// 封装超时的fetch
function fetchTimeout(url, init, timeout = 3000) {
  return new Promise((resolve, reject) => {
    fetch(url, init).then(resolve).catch(reject);
    setTimeout(reject, timeout);
  });
}

// TODO: 封装一个通用的异步函数超时报错逻辑
function xx(fn, timeout) {}

// 中断fetch
const controller = new AbortController();
fetch("http://domain/service", {
  method: "GET",
  credentials: "same-origin",
  signal: controller.signal,
})
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error("http error");
  })
  .then((json) => {
    console.log(json);
  })
  .catch((error) => {
    console.error(error);
  });

controller.abort();
