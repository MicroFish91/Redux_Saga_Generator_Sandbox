const { effects } = require("redux-saga");
const createSagaMiddleware = require("redux-saga").default;
const { createStore, compose, applyMiddleware } = require("redux");

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  (a) => a,
  {},
  compose(applyMiddleware(sagaMiddleware))
);

// Start here
const fn = () => console.log("Called the function...");

const mySaga = function* () {
  yield fn();
};

/*
 * these are equivalent
 */

const callSaga = function* () {
  yield effects.call(fn);
};

// Call - Calls the specified method, equivalent to invoking the method directly,
// used for testing

sagaMiddleware.run(mySaga); // Called the function...
sagaMiddleware.run(callSaga); // Called the function...
