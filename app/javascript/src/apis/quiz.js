import axios from "axios";

const create = payload => axios.post("/quizzes", payload);
const list = () => axios.get("/quizzes");
const update = ({ id, payload }) => axios.put(`/quizzes/${id}`, payload);

export const QuizApi = {
  create,
  list,
  update,
};
