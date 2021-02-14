import { PUT_TITLE, SET_BACKDROP } from './types'

export function putTitle(payload) {
  return {
    type: PUT_TITLE,
    payload,
  };
}

export function showBackDrop(payload) {
  return {
    type: SET_BACKDROP,
    payload: payload,
  };
}