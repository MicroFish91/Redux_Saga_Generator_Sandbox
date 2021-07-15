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
const process = function* () {
  let timesLooped = 0;
  while (true) {
    console.info(`Looped ${timesLooped++} times`);
    yield delay(500);
  }
};

const saga = function* () {
  yield effects.spawn(process);
  yield delay(2000);
  throw new Error();
};

// Spawn - Creates a new process, similar to fork - caller is not interrupted
// New process is not child of caller - will not be cancelled if caller
// errors or is itself cancelled

sagaMiddleware.run(saga);

// if fork were used instead of spawn, the loop would stop upon erroring
