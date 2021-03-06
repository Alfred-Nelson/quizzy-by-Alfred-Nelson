import axios from "axios";

const create = payload => axios.post("/quizzes", payload);
const list = () => axios.get("/quizzes");
const update = ({ id, payload }) => axios.put(`/quizzes/${id}`, payload);
const kill = id => axios.delete(`/quizzes/${id}`);
const show = id => axios.get(`/quizzes/${id}`);
const publish = id => axios.get(`/slug/${id}`);
const getQuizBySlug = slug => axios.get(`/slug/quizzes/${slug}`);
const getQuizQuestionsBySlug = slug =>
  axios.get(`slug/quizzes/${slug}/questions`);
const generateReport = () => axios.get("/generate_report");
const reportStatus = id => axios.get(`/report_status/${id}`);
const showStandard = id => axios.get(`/standard/quizzes/${id}`);

export const QuizApi = {
  create,
  list,
  update,
  kill,
  show,
  publish,
  getQuizBySlug,
  getQuizQuestionsBySlug,
  generateReport,
  reportStatus,
  showStandard,
};
