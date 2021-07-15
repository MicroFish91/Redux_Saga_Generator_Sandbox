const generator = function* () {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  return 5;
};

const test = generator();

/*
 * console.log(test);
 * console.log(test.value); // undefined
 * console.log(test.next()); // { value: 1, done: false}
 * console.log(test.next().value); // 2
 * console.log(test.next().value); // 3
 * console.log(test.next().value); // 4
 * console.log(test.next()); // { value: 5, done: true}
 * console.log(test.next()); // { value: undefined, done: true}
 */

const delayGenerator = function* () {
  yield new Promise((res) => setTimeout(res(4), 1000));
  return 42;
};

async function delayMain() {
  const delayTest = delayGenerator();

  /*
   * console.log(delayTest.next()); // { value: Promise { <pending> }, done: false }
   */

  // const delayResult = await delayTest.next() // { value: Promise { 4 }, done: false }
  const delayResult = await delayTest.next().value; // 4
  console.log(delayTest.next().value); // 42
}

delayMain();
