import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import uiReducer from "./reducers/ui";
import cssPropertiesReducer from "./reducers/cssProperties";

const rootReducer = combineReducers({
  ui: uiReducer,
  cssProperties: cssPropertiesReducer
});

let composeEnhancers = compose;

const configureStore = () => {
  return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
};

export default configureStore;
