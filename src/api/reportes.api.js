import axios from "axios";

const URL = process.env.REACT_APP_URL_API;

export const reporteEstudiante = async(data) =>
await axios.post(`${URL}preguntas/resultado`, data);

