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

// Take - pauses between concurrent lines of code, resumes when specified action is dispatched (only one thread)

// Holds until it receives "SET_STATE" action type
sagaMiddleware.run(mySaga); // Saga begins...

// Upon receiving, runs next step of the generator function
store.dispatch({ type: "SET_STATE", value: 42 }); // Got state...  { type: 'SET_STATE', value: 42 }
