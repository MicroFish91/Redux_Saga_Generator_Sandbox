const { delay, effects } = require("redux-saga");
const createSagaMiddleware = require("redux-saga").default;
const { createStore, compose, applyMiddleware } = require("redux");

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  (a) => a,
  {},
  compose(applyMiddleware(sagaMiddleware))
);

// Start here
function* fn() {
  while (true) {
    console.log("FN!");
    yield delay(1000);
  }
}

const saga = function* () {
  while (true) {
    yield effects.fork(fn);
    yield delay(1000);
  }
};

// Fork - Invokes the specified method (like call), can't access yielded variables,
// caller continues without pausing execution
// if parent process errors or is cancelled, all forked processes are cancelled
// finally block of forked method is invoked during cancellation

sagaMiddleware.run(saga);
