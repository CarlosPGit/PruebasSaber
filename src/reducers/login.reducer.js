import { SET_USER } from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user: {
    name: "",
    email: "",
    root: false,
  },
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        isAuthenticated: action.payload.email !== "",
        user: action.payload,
      };
    default:
      return state;
  }
};

export default loginReducer;