const { effects, delay } = require("redux-saga");
const createSagaMiddleware = require("redux-saga").default;
const { createStore, compose, applyMiddleware } = require("redux");

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  (a) => a,
  {},
  compose(applyMiddleware(sagaMiddleware))
);

const process = function* () {
  let timesLooped = 0;
  while (true) {
    console.info(`Looped ${timesLooped++} times`);
    yield delay(500);
  }
};

const saga = function* () {
  yield effects.takeLatest("START_PROCESS", process);
};

// Takelatest - Combination of fork, takeEvery, and cancel
// forks child process each time specified action is dispatched
// while keeping exactly one instance of the child process running

sagaMiddleware.run(saga);

store.dispatch({ type: "START_PROCESS" });

setTimeout(() => {
  store.dispatch({ type: "START_PROCESS" });
}, 3000);
