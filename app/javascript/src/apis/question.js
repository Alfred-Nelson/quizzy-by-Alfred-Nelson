import axios from "axios";

const create = payload => axios.post("/questions", payload);
const show = id => axios.get(`/questions/${id}`);
const update = (id, payload) => axios.put(`/questions/${id}`, payload);
const kill = id => axios.delete(`/questions/${id}`);

export const QuestionApi = {
  create,
  show,
  update,
  kill,
};
