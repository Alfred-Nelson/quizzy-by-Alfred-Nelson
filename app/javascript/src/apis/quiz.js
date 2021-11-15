import axios from "axios";

const create = payload => axios.post("/quizzes", payload);
const list = () => axios.get("/quizzes");
const update = ({ id, payload }) => axios.put(`/quizzes/${id}`, payload);
const kill = id => axios.delete(`/quizzes/${id}`);
const show = id => axios.get(`/quizzes/${id}`);
const publish = id => axios.get(`/slug/${id}`);

export const QuizApi = {
  create,
  list,
  update,
  kill,
  show,
  publish,
};
