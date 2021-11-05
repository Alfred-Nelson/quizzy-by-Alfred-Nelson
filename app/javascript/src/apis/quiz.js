import axios from "axios";

const create = payload => axios.post("/quizzes", payload);

export const QuizApi = {
  create,
};
