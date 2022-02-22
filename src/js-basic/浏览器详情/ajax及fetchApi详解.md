```js
const xhr = new XMLHttpRequest();
xhr.open("GET", "https://domain/service");
xhr.onreadystatechange = function() {
  if(xhr.readyState !==4) {
    return;
  }

  if(xhr.status == '200') {

  }

}
```