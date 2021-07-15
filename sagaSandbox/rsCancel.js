const { effects, delay } = require("redux-saga");
const createSagaMiddleware = require("redux-saga").default;
const { createStore, compose, applyMiddleware } = require("redux");

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  (a) => a,
  {},
  compose(applyMiddleware(sagaMiddleware))
);

// Start here
const process = function* () {
  try {
    while (true) {
      console.log("Process looped");
      yield delay(500);
    }
  } finally {
    const cancelled = yield effects.cancelled();
    console.info("Cancelled?", cancelled);
  }
};

const saga = function* () {
  const forked = yield effects.fork(process);
  yield delay(5000);
  yield effects.cancel(forked);
  console.info("DONE!");
};

// Cancel - stops a forked process, stopped process will be cut off at most recent yield,
// finally is invoked in forked process

// Cancelled - Method that returns true if callee process has been cancelled by caller,
// Used in finally block to determine if cancellation (not error) is cause of termination

sagaMiddleware.run(saga);
