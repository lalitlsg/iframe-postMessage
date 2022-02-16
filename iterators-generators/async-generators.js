async function* range(from, to) {
  for (let i = from; i <= to; i++) {
    await new Promise((resolve) => setTimeout(() => resolve(), 1000));
    yield i;
  }
}

(async () => {
  for await (const val of range(1, 5)) {
    console.log(val);
  }
})();
