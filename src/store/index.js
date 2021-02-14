import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { loginReducer, layoutReducer, dataReducer } from "../reducers";
import thunk from "redux-thunk";

export const store = createStore(
  combineReducers({ auth: loginReducer, layout: layoutReducer, data: dataReducer }),
  composeWithDevTools(applyMiddleware(thunk))
);
