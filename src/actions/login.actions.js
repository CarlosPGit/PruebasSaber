import { SET_USER } from "./types";
// import setAuthorizationToken from "../shared/utils/setAuthToken";
import jwtDecode from "jwt-decode";
import { loginService} from "../api/login.api";
import JwtDecode from "jwt-decode";
import setAuthorizationToken from "../shared/utils/setAuthToken";

export function setCurrentUser(user) {
  let { email, name, role } = user;
  return {
    type: SET_USER,
    payload: { email, name, root: role === "Admin" },
  };
}

export function login(data) {
  return async (dispatch) => {
    let { email, password } = data;
    return loginService({ email, password }).then(
      (res) => {
        const token = res.data;
        localStorage.setItem("jwtToken", token);
        setAuthorizationToken();
        const user = jwtDecode(token);
        console.log("user", user)
        dispatch(setCurrentUser(user));
      },
      (err) => {
        return Promise.reject(err);
      }
    );
  };
}
