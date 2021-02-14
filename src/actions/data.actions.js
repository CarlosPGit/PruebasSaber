import { SET_ANSWER, SET_QUESTIONS } from './types'
import { getQuestionsbyMateria, getRandomQuestionsbyMateria } from "../api/materias.api";

export function setQuestions(payload) {
  return {
    type: SET_QUESTIONS,
    payload,
  };
}

export function getQuestions(data) {
  return async (dispatch) => {
    return getQuestionsbyMateria(data).then(
      (res) => {
        dispatch(setQuestions(res.data));
      },
      (err) => {
        return Promise.reject(err);
      }
    );
  };
}

export function getRandomQuestions(data) {
  return async (dispatch) => {
    return getRandomQuestionsbyMateria(data).then(
      (res) => {
        dispatch(setQuestions(res.data));
      },
      (err) => {
        return Promise.reject(err);
      }
    );
  };
}