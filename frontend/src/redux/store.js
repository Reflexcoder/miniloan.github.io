import { createStore, combineReducers, applyMiddleware } from "redux";

import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { loanReducer } from "./loanReducer";
import { adminloanReducer, userReducer } from "./userReducer";

const reducer = combineReducers({
  loan: loanReducer,
  user: userReducer,
  adminLoan: adminloanReducer,
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
