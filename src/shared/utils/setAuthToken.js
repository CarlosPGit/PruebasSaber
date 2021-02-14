import axios from "axios";
import Swal from "sweetalert2";
import { showBackDrop } from "../../actions/layout.actions";
import { setCurrentUser } from "../../actions/login.actions";
import { store } from "../../store";

export default function setAuthorizationToken() {
  const token = localStorage.jwtToken;

  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }

  axios.interceptors.request.use(
    (response) => {
      store.dispatch(showBackDrop(true));
      return response;
    },
    (error) => {
      store.dispatch(showBackDrop(false));
      return error;
    }
  );

  axios.interceptors.response.use(
    (response) => {
      store.dispatch(showBackDrop(false));
      return response;
    },
    function (error) {
      store.dispatch(showBackDrop(false));
      // Do something with response error
      if (error.response.status === 401) {
        localStorage.removeItem("jwtToken");
        delete axios.defaults.headers.common["Authorization"];

        Swal.fire({
          title: "La sesion expiro",
          text: "Sera redirigido al login.",
          icon: "warning",
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Login",
        }).then((result) => {
          if (result.value) {
            store.dispatch(setCurrentUser({}));
          }
        });
      } else return Promise.reject(error.response);
    }
  );
}
