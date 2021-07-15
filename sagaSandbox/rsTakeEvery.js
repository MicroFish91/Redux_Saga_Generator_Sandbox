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
  while (true) {
    console.log("Process loop.");
    yield delay(1000);
  }
};

const saga = function* () {
  yield effects.takeEvery("START_PROCESS", process);
  console.log("Saga got to the end...");
};

// TakeEvery - Works like take, except forks the specified method every time
// specified action is dispatched, code execution resumes immediately in main thread

// Runs all the way through without stopping, takeEvery triggers anytime the action is dispatched
sagaMiddleware.run(saga); // Immediately Displays: Saga got to the end....

// Each dispatch triggers a fork, so calling repeatedly will open multiple process loops
store.dispatch({ type: "START_PROCESS" });
store.dispatch({ type: "START_PROCESS" });
store.dispatch({ type: "START_PROCESS" });
store.dispatch({ type: "START_PROCESS" });
