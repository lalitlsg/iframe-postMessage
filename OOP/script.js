function func(b, c) {
  console.log(this.a, b, c);
  return this.a + b + c;
}

function once(func) {
  let res = null;

  return function (...args) {
    console.log(this);
    if (res) return res;
    res = func.apply(this, args);
    return res;
  };
}

const onced = once(func);
const obj = {
  a: 1,
  onced,
};

const res = obj.onced(2, 3);

console.log(res);
