const { delay, effects } = require("redux-saga");
const createSagaMiddleware = require("redux-saga").default;
const { createStore, compose, applyMiddleware } = require("redux");

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  (a) => a,
  {},
  compose(applyMiddleware(sagaMiddleware))
);

// * Start Here
function* updateSaga() {
  const chan = yield effects.actionChannel("UPDATE");
  while (true) {
    yield effects.take(chan);
    console.info("Update logged.");
    yield delay(1000);
  }
}

// * Action Channel -
// * Buffer actions to be processed one at a time

// * Record all events with specified type
// * Calling take accesses and removes oldest record
// * Used to handle actions that would otherwise be lost

sagaMiddleware.run(updateSaga);
store.dispatch({ type: "UPDATE" });
store.dispatch({ type: "UPDATE" });
store.dispatch({ type: "UPDATE" });
store.dispatch({ type: "UPDATE" });
store.dispatch({ type: "UPDATE" });
store.dispatch({ type: "UPDATE" });
store.dispatch({ type: "UPDATE" });
store.dispatch({ type: "UPDATE" });
store.dispatch({ type: "UPDATE" });
store.dispatch({ type: "UPDATE" });

// normally some of the dispatch actions might be lost,
// but action channel buffering ensures that all the updates are captured
// i.e. vs. effects.take()
