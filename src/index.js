import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Main from "./shared/routes";
import reportWebVitals from './reportWebVitals';
import { store } from "./store";
import setAuthorizationToken from './shared/utils/setAuthToken';
import { setCurrentUser } from "./actions/login.actions";
import jwtDecode from "jwt-decode";


if (localStorage.jwtToken) {
  setAuthorizationToken();
  const user = jwtDecode(localStorage.jwtToken);
  store.dispatch(
    setCurrentUser(user)
  );
} 

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
