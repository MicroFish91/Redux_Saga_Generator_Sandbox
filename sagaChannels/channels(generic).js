const { delay, effects, channel } = require("redux-saga");
const createSagaMiddleware = require("redux-saga").default;
const { createStore, compose, applyMiddleware } = require("redux");

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  (a) => a,
  {},
  compose(applyMiddleware(sagaMiddleware))
);

// Start here
function* saga() {
  const chan = yield channel();
  function* handleRequest(chan) {
    while (true) {
      const payload = yield effects.take(chan);
      console.info("Got Payload", payload);
      yield delay(1000);
    }
  }

  yield effects.fork(handleRequest, chan);
  yield effects.fork(handleRequest, chan);

  // do 1vs2vs3
  // in case 3, the first 2 process immediately, the third must wait for 1 to finish so that it can be
  // processed since there are only 2 forks, the third request waits in the channel for processing
  yield effects.put(chan, { payload: 42 });
  yield effects.put(chan, { payload: 42 });
  yield effects.put(chan, { payload: 42 });
}

// Generic Channels -
// Creates a special line of communication between two sagas
// Action types not required

sagaMiddleware.run(updateSaga);
