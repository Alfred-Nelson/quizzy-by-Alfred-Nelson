import axios from "axios";

const create = payload => axios.post("/quizzes", payload);
const list = () => axios.get("/quizzes");

export const QuizApi = {
  create,
  list,
};
