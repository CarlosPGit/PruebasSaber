import axios from "axios";

const URL = process.env.REACT_APP_URL_API;

export const getMaterias = async () => await axios.get(`${URL}materias/getall`);

export const getQuestionsbyMateria = async (materiaId) =>
  await axios.get(`${URL}preguntas/getAll?materiaId=${materiaId}`);

export const getRandomQuestionsbyMateria = async (materiaId) =>
  await axios.get(
    `${URL}preguntas/getRandom?materiaId=${materiaId}&take=25&page=1`
  );

export const createMateria = async (data) =>
  await axios.post(`${URL}materias`, data);

export const deleteMateriaById = async (data) =>
  await axios.delete(`${URL}materias/${data}`);
