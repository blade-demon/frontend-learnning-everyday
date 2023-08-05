function createCache() {
  const data = {};
  return {
    set(key, val) {
      data[key] = val;
    },

    get(key) {
      return data[key];
    },
  };
}

const c = createCache();
c.set("a", 100);

console.log(c.get("a"));
