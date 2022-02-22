interface IOptions {
  url: string;
  type: "GET" | "POST";
  data: any;
  timeout?: number;
}

// 对象转为queryString
function formateUrl(object) {
  let dataArr = [];
  for (let key in object) {
    dataArr.push(`${key}=${encodeURIComponent(object[key])}`);
  }
  return dataArr.join("&");
}

export function ajax(
  options: IOptions = {
    type: "GET",
    data: {},
    timeout: 3000,
    url: "",
  }
) {
  return new Promise((resolve, reject) => {
    if (!options.url) {
      return;
    }

    const queryString = formateUrl(options.data);
    const stateChange = () => {
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if ((xhr.state >= 200 && xhr.state < 300) || xhr.status === 304) {
            resolve(xhr.responseText);
          } else {
            reject(xhr.status);
          }
        }
      };
    };
    let timer;
    let xhr;

    if ((window as any).XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else {
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    if (options.type.toUpperCase() === "GET") {
      xhr.open("GET", `${options.url}?${queryString}`);
      stateChange();
      xhr.send();
    } else if (options.type.toUpperCase() === "POST") {
      xhr.open("POST", options.url);
      xhr.setRequestHeader("ContentType", "application/x-www-form-urlencoded");
      stateChange();
      xhr.send();
    }

    // 超时处理
    if (options.timeout) {
      timer = setTimeout(() => {
        xhr.abort();
        reject("timeout");
      }, options.timeout);
    }
  });
}
