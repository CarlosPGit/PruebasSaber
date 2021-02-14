import axios from "axios";

const URL = process.env.REACT_APP_URL_API + "identity/";

export const loginService = (data) =>
  axios.post(URL + "login", data);
  
export const signupService = (data) =>
  axios.post(URL + "signup", data);