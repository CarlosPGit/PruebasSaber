import axios from "axios";

const URL = process.env.REACT_APP_URL_API;

export const createQuestion = async (data) =>
  await axios.post(`${URL}preguntas/crear`, data);

export const updateQuestion = async (data) =>
  await axios.put(`${URL}preguntas/actualizar`, data);

export const sendAnswers = (data) =>
  axios.post(`${URL}preguntas/resultado`, data);

export const deletePreguntaById = async (data) =>
  await axios.delete(`${URL}preguntas/eliminar_pregunta/${data}`);
