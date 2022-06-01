const interval = (cb, time) => {
  let timer;

  const obj = {
    clear: () => clearTimeout(timer),
  };

  const helper = () => {
    cb();
    timer = setTimeout(helper, time);
  };
  helper();

  return obj;
};

const cb = () => console.log('Hello');
const int = interval(cb, 1000);
console.log(int);
setTimeout(() => {
  int.clear();
}, 10000);
