import axios from "axios";

const create = payload => axios.post("/quizzes", payload);
const list = () => axios.get("/quizzes");
const update = ({ id, payload }) => axios.put(`/quizzes/${id}`, payload);
const kill = id => axios.delete(`/quizzes/${id}`);

export const QuizApi = {
  create,
  list,
  update,
  kill,
};
