// const xhr = new XMLHttpRequest();
// xhr.open("GET", "./data.json", true); // true 表示异步
// xhr.onreadystatechange = function () {
//   if (xhr.readyState === 4) {
//     if (xhr.status === 200) {
//       alert(xhr.responseText);
//     } else {
//       console.log("其他情况");
//     }
//   }
// };

// xhr.send(null);

// post 请求
// const postData = {
//   userName: "zhangsan",
//   password: "xxx",
// };
// const xhr = new XMLHttpRequest();
// xhr.open("POST", "./login", true);
// xhr.onreadystatechange = function () {
//   if (xhr.readyState === 4) {
//     if (xhr.status === 200) {
//       alert(xhr.responseText);
//     } else {
//       console.log("其他情况");
//     }
//   }
// };

// xhr.send(JSON.stringify(postData));

function ajaxPromise(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
      console.log(xhr.readyState);
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        } else if (xhr.status === 404) {
          reject(new Error("404 not found!"));
        }
      }
    };

    xhr.send();
  });
}

ajaxPromise("./data.json")
  .then((result) => {
    console.log(result);
  })
  .catch((e) => {
    console.log(e);
  });
