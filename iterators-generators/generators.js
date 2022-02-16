function* range(from, to) {
  for (let i = from; i <= to; i++) {
    yield i;
  }
}

for (const val of range(1, 5)) {
  console.log(val);
}
