import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";

import authReducer from "./store/reducers/auth";
import orderReducer from "./store/reducers/orderReducer";
import { watchAuthSaga, watchOrdersSaga } from "./store/sagas/index";
import "./index.css";
import "./Theme.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const rootReducer = combineReducers({
  authReducer: authReducer,
  orderReducer: orderReducer,
});

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers =
  (typeof window !== undefined &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware, thunk))
);
sagaMiddleware.run(watchAuthSaga);
sagaMiddleware.run(watchOrdersSaga);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
