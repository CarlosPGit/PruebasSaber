import { PUT_TITLE, SET_BACKDROP } from "../actions/types";

const initialState = {
  title: "",
  backDrop: false,
};

const layoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case PUT_TITLE:
      return {
        ...state,
        title: action.payload,
      };
    case SET_BACKDROP: {
      return {
        ...state,
        backDrop: action.payload,
      };
    }
    default:
      return state;
  }
};

export default layoutReducer;
