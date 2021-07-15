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
const mySaga = function* () {
  console.info("Saga begins...");
  const state = yield effects.take("SET_STATE");
  console.info("Got state... ", state);
};

const putSaga = function* () {
  yield effects.put({ type: "SET_STATE", value: 42 });
};

// Put - Immediately dispatches an action to the rest of the app, code execution does not pause
// like calling dispatch in Redux-Thunk

sagaMiddleware.run(mySaga); // Saga begins...

sagaMiddleware.run(putSaga); // Got state...  { type: 'SET_STATE', value: 42 }
