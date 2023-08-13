function query(name) {
  const search = window.location.search.slice(1);
  // search   a=1&b=2&c=3
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, "i");
  // console.log(reg);
  const res = search.match(reg);
  console.log(res);
  if (!res) return null;
  return res[2];
}

function query2(name) {
  const { search } = window.location;
  const p = new URLSearchParams(search);
  return p.get(name);
}

console.log(query("name"));
