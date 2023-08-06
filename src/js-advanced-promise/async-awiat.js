const fn = (function () {
  return 100;
})(async () => {
  const a = fn();

  const b = await fn();
})();
