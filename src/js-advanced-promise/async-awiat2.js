(async function () {
  console.log("start");
  const a = await 100;
  console.log("a", a);

  const b = await Promise.resolve(200);
  console.log("b", b);

  const c = await Promise.reject(300); // await 相当于 then， reject 报错，需要用 try catch
  console.log("c", c);

  console.log("end");
})();
