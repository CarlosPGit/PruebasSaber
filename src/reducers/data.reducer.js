import { SET_ANSWER, SET_QUESTIONS } from "../actions/types";

const initialState = {
  q: [],
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_QUESTIONS:
      return {
        ...state,
        q: action.payload,
      };
    default:
      return state;
  }
};

export default dataReducer;
