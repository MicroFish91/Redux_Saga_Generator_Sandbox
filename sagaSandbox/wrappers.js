const co = require("co");

// Redux saga wraps generators automatically
// Co.js can wrap generators outside of Redux-Saga app

const delayGenerator = function* () {
  const data1 = yield new Promise((r) => setTimeout(r(1), 1000));
  console.info("Step 1");
  const data2 = yield new Promise((r) => setTimeout(r(2), 2000));
  console.info("Step 2");
  const data3 = yield new Promise((r) => setTimeout(r(3), 3000));
  console.info("Step 3");
  return data1 + data2 + data3;
};

const delayed = delayGenerator();

/*
  ! without a wrapper
  * console.log(delayed.next()); //  { value: Promise { 1 }, done: false }
  * console.log(delayed.next()); // { value: Promise { 2 }, done: false }
  * console.log(delayed.next()); // { value: Promise { 3 }, done: false }
  * console.log(delayed.next()); // { value: NaN, done: true }
*/

// ! with a wrapper
const wrapped = co.wrap(delayGenerator);

const coWrapperReturn = async () => {
  const result = await wrapped();
  console.log(result); // 6
};

coWrapperReturn();
